import axios from 'axios';
import type { GoogleSheetsApiResponse } from '../types';
import { padRowToMatchHeader } from './csvHelper';
import { handleApiError } from './errorHandler';

const convertRowsToCsv = (rows: string[][]): string => {
	if (rows.length === 0) {
		throw new Error('시트 데이터가 비어있습니다.');
	}

	const headerRow = rows[0];
	const dataRows = rows.slice(1);

	const csvLines: string[] = [headerRow.join(',')];
	
	const processDataRowToCsv = (row: string[]): void => {
		const paddedRow = padRowToMatchHeader(row, headerRow.length);
		csvLines.push(paddedRow.join(','));
	};
	
	dataRows.forEach(processDataRowToCsv);

	return csvLines.join('\n');
};

export const fetchDictionaryDataByApi = async (
	apiKey: string,
	sheetId: string,
	sheetName: string = ''
): Promise<string> => {
	const range = sheetName ? `${sheetName}!A:Z` : 'A:Z';
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

	try {
		const response = await axios.get<GoogleSheetsApiResponse>(url);

		if (response.data.error) {
			throw new Error(
				`구글 시트 API 오류: ${response.data.error.message} (${response.data.error.status})`
			);
		}

		if (!response.data.values || response.data.values.length === 0) {
			throw new Error('시트 데이터가 비어있습니다.');
		}

		return convertRowsToCsv(response.data.values);
	} catch (error) {
		throw handleApiError(error);
	}
};
