import * as vscode from 'vscode';
import type { LanguageDictionary } from '../types';
import { fetchDictionaryData } from '../utils/fetcher';
import { fetchMultipleSheetsByApi } from '../utils/multiSheetFetcher';
import { parseCsvToDictionary } from '../utils/parser';
import { extractSheetIdFromUrl } from '../utils/sheetIdExtractor';
import { fetchAllSheetNames } from '../utils/sheetListFetcher';
import { parseSheetNames } from '../utils/sheetNameParser';

const resolveSheetId = (
	sheetId: string | undefined,
	sheetUrl: string | undefined
): string | undefined => {
	if (!sheetId && !sheetUrl) {
		return undefined;
	}

	if (sheetId) {
		const extractedFromId = extractSheetIdFromUrl(sheetId);
		if (extractedFromId) {
			return extractedFromId;
		}
		return sheetId;
	}

	if (sheetUrl) {
		const extractedId = extractSheetIdFromUrl(sheetUrl);
		return extractedId || undefined;
	}

	return undefined;
};

const fetchCsvDataByApi = async (
	sheetApiKey: string,
	finalSheetId: string,
	isAllSheetNames: boolean,
	targetSheetNamesConfig: string
): Promise<string> => {
	if (isAllSheetNames) {
		const sheetNames = await fetchAllSheetNames(sheetApiKey, finalSheetId);
		
		if (sheetNames.length === 0) {
			throw new Error('가져올 시트가 없습니다.');
		}

		return await fetchMultipleSheetsByApi(sheetApiKey, finalSheetId, sheetNames);
	}

	const sheetNames = parseSheetNames(targetSheetNamesConfig);
	
	if (sheetNames.length === 0) {
		throw new Error(
			'targetSheetNames 설정에 시트 이름을 쉼표(,)로 구분하여 입력해주세요. 예: WD,ST,CD'
		);
	}

	return await fetchMultipleSheetsByApi(sheetApiKey, finalSheetId, sheetNames);
};

const fetchCsvDataByUrl = async (sheetUrl: string): Promise<string> => {
	if (!sheetUrl) {
		throw new Error('CSV URL을 입력해주세요!');
	}

	return await fetchDictionaryData(sheetUrl);
};

const fetchCsvDataByApiKey = async (
	sheetApiKey: string,
	sheetId: string | undefined,
	sheetUrl: string | undefined,
	isAllSheetNames: boolean,
	targetSheetNamesConfig: string
): Promise<string> => {
	const finalSheetId = resolveSheetId(sheetId, sheetUrl);

	if (!finalSheetId) {
		throw new Error(
			'시트 ID를 입력하거나, 시트 URL에서 자동 추출할 수 있도록 URL을 입력해주세요!'
		);
	}

	return await fetchCsvDataByApi(
		sheetApiKey,
		finalSheetId,
		isAllSheetNames,
		targetSheetNamesConfig
	);
};

const saveDictionaryAndShowMessage = async (
	context: vscode.ExtensionContext,
	csvData: string,
	method: string
): Promise<LanguageDictionary> => {
	const freshDictionary = await parseCsvToDictionary(csvData);
	
	await context.globalState.update('langData', freshDictionary);
	
	const entryCount = Object.keys(freshDictionary).length;
	vscode.window.showInformationMessage(
		`동기화 완료! (${entryCount}개 데이터, ${method} 사용)`
	);
	
	return freshDictionary;
};

export const syncLanguageData = async (
	context: vscode.ExtensionContext,
	languageDictionary: LanguageDictionary
): Promise<LanguageDictionary> => {
	const config = vscode.workspace.getConfiguration('languageHelper');
	const sheetApiKey = config.get<string>('sheetApiKey');
	const sheetId = config.get<string>('sheetId');
	const isAllSheetNames = config.get<boolean>('allSheetNames') ?? true;
	const targetSheetNamesConfig = config.get<string>('targetSheetNames') || 'WD,ST,CD';
	const sheetUrl = config.get<string>('sheetUrl');

	if (!sheetApiKey && !sheetUrl) {
		vscode.window.showErrorMessage(
			'설정창에서 구글 시트 API 키를 입력하거나, CSV URL을 입력해주세요!'
		);
		return languageDictionary;
	}

	try {
		if (sheetApiKey) {
			const csvData = await fetchCsvDataByApiKey(
				sheetApiKey,
				sheetId,
				sheetUrl,
				isAllSheetNames,
				targetSheetNamesConfig
			);
			return await saveDictionaryAndShowMessage(context, csvData, 'API');
		}

		const csvData = await fetchCsvDataByUrl(sheetUrl || '');
		return await saveDictionaryAndShowMessage(context, csvData, 'CSV URL');
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
		vscode.window.showErrorMessage(
			`데이터를 가져오는데 실패했습니다: ${errorMessage}`
		);
		return languageDictionary;
	}
};

