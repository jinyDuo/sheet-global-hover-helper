import axios from 'axios';
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
	apiKey: string,
	sheetId: string
): Promise<string[]> => {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}&fields=sheets.properties.title`;

	try {
		const response = await axios.get<SpreadsheetMetadata>(url);

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
