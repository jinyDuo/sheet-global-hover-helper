import * as vscode from 'vscode';
import { provideHover } from './providers/hover';
import { syncLanguageData } from './services/sync';
import type { LanguageDictionary } from './types';

export const activate = (context: vscode.ExtensionContext): void => {
	let languageDictionary: LanguageDictionary = context.globalState.get<LanguageDictionary>('langData', {});

	const handleSyncCommand = (): void => {
		syncLanguageData(context, languageDictionary).then((updatedDictionary) => {
			languageDictionary = updatedDictionary;
		});
	};

	const handleProvideHover = (
		document: vscode.TextDocument,
		position: vscode.Position
	): vscode.Hover | null => {
		return provideHover(document, position, languageDictionary);
	};

	const disposableCommand = vscode.commands.registerCommand(
		'languageHelper.sync',
		handleSyncCommand
	);

	const hoverProvider = vscode.languages.registerHoverProvider(
		['typescript', 'javascript', 'typescriptreact', 'javascriptreact'],
		{ provideHover: handleProvideHover }
	);

	context.subscriptions.push(disposableCommand, hoverProvider);
};

export const deactivate = (): void => {};
