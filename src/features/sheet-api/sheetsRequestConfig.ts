import type { SheetsCredential } from '../../shared/sheet-data/types';

type SheetsRequestConfig = {
	headers: Record<string, string>;
	params: Record<string, string>;
};

export const buildSheetsRequestConfig = (credential: SheetsCredential): SheetsRequestConfig => {
	if (credential.type === 'oauth') {
		return {
			headers: { Authorization: `Bearer ${credential.accessToken}` },
			params: {}
		};
	}
	return { headers: {}, params: { key: credential.apiKey } };
};
