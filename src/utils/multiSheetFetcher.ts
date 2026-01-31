import axios from 'axios';
import type { GoogleSheetsApiResponse } from '../types';
import { padRowToMatchHeader } from './csvHelper';
import { createSheetError } from './errorHandler';

const fetchSingleSheet = async (
	apiKey: string,
	sheetId: string,
	sheetName: string
): Promise<string[][]> => {
	const range = `${sheetName}!A:Z`;
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

	try {
		const response = await axios.get<GoogleSheetsApiResponse>(url);

		if (response.data.error) {
			throw new Error(
				`시트 "${sheetName}" 오류: ${response.data.error.message}`
			);
		}

		if (!response.data.values || response.data.values.length === 0) {
			return [];
		}

		return response.data.values;
	} catch (error) {
		throw createSheetError(sheetName, error);
	}
};

const processSheetRows = (
	rows: string[][],
	headerRow: string[] | null,
	allRows: string[][]
): string[] => {
	if (rows.length === 0) {
		return headerRow || [];
	}

	const newHeaderRow = headerRow || rows[0];
	if (!headerRow) {
		allRows.push(newHeaderRow);
	}

	const dataRows = rows.slice(1);
	
	const processDataRow = (row: string[]): void => {
		const paddedRow = padRowToMatchHeader(row, newHeaderRow.length);
		allRows.push(paddedRow);
	};
	
	dataRows.forEach(processDataRow);

	return newHeaderRow;
};

export const fetchMultipleSheetsByApi = async (
	apiKey: string,
	sheetId: string,
	sheetNames: string[]
): Promise<string> => {
	if (sheetNames.length === 0) {
		throw new Error('시트 이름 목록이 비어있습니다.');
	}

	const allRows: string[][] = [];
	let headerRow: string[] | null = null;

	for (const sheetName of sheetNames) {
		try {
			const rows = await fetchSingleSheet(apiKey, sheetId, sheetName);
			headerRow = processSheetRows(rows, headerRow, allRows);
		} catch (error) {
			throw createSheetError(sheetName, error);
		}
	}

	if (allRows.length === 0) {
		throw new Error('가져온 시트 데이터가 비어있습니다.');
	}

	const convertRowToCsvLine = (row: string[]): string => {
		return row.join(',');
	};
	
	const csvLines: string[] = allRows.map(convertRowToCsvLine);
	return csvLines.join('\n');
};
