import type { ParseConfig, ParseResult } from 'papaparse';
import { parse } from 'papaparse';
import type { LanguageDictionary } from '../types';

const hasCriticalErrors = (errors: ParseResult<any>['errors']): boolean => {
	return errors.some(
		(error) => error.type === 'Quotes' || error.type === 'Delimiter'
	);
};

const createLanguageEntry = (row: any): { ko: string; en: string; ja: string } => {
	return {
		ko: row.ko || '',
		en: row.en || '',
		ja: row.ja || ''
	};
};

const processRowToDictionary = (
	dictionary: LanguageDictionary,
	row: any
): void => {
	if (row.key) {
		dictionary[row.key] = createLanguageEntry(row);
	}
};

const buildDictionaryFromRows = (rows: any[]): LanguageDictionary => {
	const dictionary: LanguageDictionary = {};

	rows.forEach((row) => {
		processRowToDictionary(dictionary, row);
	});

	return dictionary;
};

const transformHeaderValue = (header: string): string => {
	return header.trim();
};

const transformCellValue = (value: string): string => {
	return value.trim();
};

const handleParseComplete = (
	resolve: (value: LanguageDictionary) => void,
	reject: (reason?: any) => void
) => {
	return (parseResults: ParseResult<any>): void => {
		if (hasCriticalErrors(parseResults.errors)) {
			reject(new Error(parseResults.errors[0].message));
			return;
		}

		const dictionary = buildDictionaryFromRows(parseResults.data);
		resolve(dictionary);
	};
};

export const parseCsvToDictionary = (csvData: string): Promise<LanguageDictionary> => {
	return new Promise((resolve, reject) => {
		const config: ParseConfig<any> = {
			header: true,
			skipEmptyLines: 'greedy',
			transformHeader: transformHeaderValue,
			transform: transformCellValue,
			complete: handleParseComplete(resolve, reject)
		};

		parse(csvData, config);
	});
};

