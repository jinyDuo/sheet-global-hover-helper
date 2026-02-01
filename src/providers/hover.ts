import * as vscode from 'vscode';
import { DEFAULT_HOVER_KEY_PATTERNS } from '../constants';
import type { LanguageDictionary } from '../types';
import { createCodePattern } from '../utils/codePatternExtractor';
import { createHoverContent } from '../utils/markdown';
import { parseSheetNames } from '../utils/sheetNameParser';

const getCodePattern = (): RegExp => {
	const config = vscode.workspace.getConfiguration('languageHelper');
	const hoverKeyPatternsConfig = config.get<string>('hoverKeyPatterns') || DEFAULT_HOVER_KEY_PATTERNS;
	const keyPatterns = parseSheetNames(hoverKeyPatternsConfig);
	return createCodePattern(keyPatterns);
};

const extractCodeFromPosition = (
	document: vscode.TextDocument,
	position: vscode.Position,
	pattern: RegExp
): string | null => {
	const line = document.lineAt(position.line);
	const lineText = line.text;

	const wordRange = document.getWordRangeAtPosition(position, pattern);
	if (!wordRange) {
		return null;
	}

	const code = document.getText(wordRange);
	return code;
};

const extractCodeFromStringLiteral = (
	document: vscode.TextDocument,
	position: vscode.Position,
	pattern: RegExp
): string | null => {
	const line = document.lineAt(position.line);
	const lineText = line.text;

	const stringPatterns = [
		/(?:getLang|t|i18n|translate|lang)\(['"`]([^'"`]+)['"`]\)/g,
		/['"`]([^'"`]+)['"`]/g
	];

	for (const stringPattern of stringPatterns) {
		let match;
		while ((match = stringPattern.exec(lineText)) !== null) {
			const stringValue = match[1];
			const codeMatch = stringValue.match(pattern);
			
			if (codeMatch) {
				const matchStart = match.index + match[0].indexOf(stringValue);
				const matchEnd = matchStart + stringValue.length;
				
				if (position.character >= matchStart && position.character <= matchEnd) {
					return codeMatch[0];
				}
			}
		}
	}

	return null;
};

export const provideHover = (
	document: vscode.TextDocument,
	position: vscode.Position,
	languageDictionary: LanguageDictionary
): vscode.Hover | null => {
	const pattern = getCodePattern();

	let code: string | null = null;

	code = extractCodeFromPosition(document, position, pattern);
	
	if (!code) {
		code = extractCodeFromStringLiteral(document, position, pattern);
	}

	if (!code) {
		return null;
	}

	const entry = languageDictionary[code];
	if (!entry) {
		return null;
	}

	const languagesWithData = Object.keys(entry).filter(
		(langCode) => entry[langCode] && entry[langCode].trim().length > 0
	);
	
	if (languagesWithData.length === 0) {
		return null;
	}

	const hoverContent = createHoverContent(code, entry);
	return new vscode.Hover(hoverContent);
};

