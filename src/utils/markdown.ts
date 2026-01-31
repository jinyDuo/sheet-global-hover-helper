import * as vscode from 'vscode';
import type { LanguageEntry } from '../types';

export const createHoverContent = (code: string, entry: LanguageEntry): vscode.MarkdownString => {
	const markdownContent = new vscode.MarkdownString();
	markdownContent.isTrusted = true;
	markdownContent.appendMarkdown(`### 🌐 **${code}**\n\n`);
	markdownContent.appendMarkdown(`- **KO**: ${entry.ko}\n`);
	markdownContent.appendMarkdown(`- **EN**: ${entry.en}\n`);
	markdownContent.appendMarkdown(`- **JA**: ${entry.ja}\n`);
	
	return markdownContent;
};



