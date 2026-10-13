import axios from 'axios';
import { buildSheetsRequestConfig } from './sheetsRequestConfig';
import type { SheetsCredential } from '../../shared/sheet-data/types';
import { handleApiError } from './errorHandler';

type SheetInfo = {
	properties: {
		title: string;
	};
};

type SpreadsheetMetadata = {
	sheets: SheetInfo[];
	error?: {
		code: number;
		message: string;
		status: string;
	};
};

export const fetchAllSheetNames = async (
	credential: SheetsCredential,
	sheetId: string
): Promise<string[]> => {
	const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;
	const requestConfig = buildSheetsRequestConfig(credential);
	requestConfig.params.fields = 'sheets.properties.title';

	try {
		const response = await axios.get<SpreadsheetMetadata>(baseUrl, requestConfig);

		if (response.data.error) {
			throw new Error(
				`구글 시트 메타데이터 오류: ${response.data.error.message} (${response.data.error.status})`
			);
		}

		if (!response.data.sheets || response.data.sheets.length === 0) {
			throw new Error('시트가 없습니다.');
		}

		const extractSheetTitle = (sheet: SheetInfo): string => {
			return sheet.properties.title;
		};

		return response.data.sheets.map(extractSheetTitle);
	} catch (error) {
		throw handleApiError(error);
	}
};
