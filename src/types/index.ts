export type LanguageEntry = {
	ko: string;
	en: string;
	ja: string;
};

export type LanguageDictionary = Record<string, LanguageEntry>;

export type GoogleSheetsApiResponse = {
	values: string[][];
	error?: {
		code: number;
		message: string;
		status: string;
	};
};



