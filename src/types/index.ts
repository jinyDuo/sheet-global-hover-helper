export type LanguageEntry = Record<string, string>;

export type LanguageDictionary = Record<string, LanguageEntry>;

export type GoogleSheetsApiResponse = {
	values: string[][];
	error?: {
		code: number;
		message: string;
		status: string;
	};
};



