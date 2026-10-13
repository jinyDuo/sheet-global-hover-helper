import * as assert from 'assert';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { fetchDictionaryDataByApi } from '../features/sheet-api/apiFetcher';
import { fetchMultipleSheetsByApi } from '../features/sheet-api/multiSheetFetcher';
import { fetchAllSheetNames } from '../features/sheet-api/sheetListFetcher';
import type { SheetsCredential } from '../shared/sheet-data/types';

suite('Sheets API request authentication', () => {
	const credentials: SheetsCredential[] = [
		{ type: 'apiKey', apiKey: 'test-api-key' },
		{ type: 'oauth', accessToken: 'test-access-token' }
	];
	for (const credential of credentials) {
		test(`${credential.type}: 단일·다중 시트와 목록 요청에 인증 및 조회 필드를 유지한다`, async () => {
			const originalGet = axios.get;
			const requests: { url: string; config?: AxiosRequestConfig }[] = [];
			try {
				axios.get = (async (url: string, config?: AxiosRequestConfig) => {
					requests.push({ url, config });
					if (url.endsWith('/values/WD!A:Z')) {
						return { data: { values: [['key', 'ko'], ['WD001', '번역']] } };
					}
					return { data: { sheets: [{ properties: { title: 'WD' } }] } };
				}) as typeof axios.get;

				assert.strictEqual(await fetchDictionaryDataByApi(credential, 'sheet-id', 'WD'), 'key,ko\nWD001,번역');
				const multipleSheets = await fetchMultipleSheetsByApi(credential, 'sheet-id', ['WD']);
				assert.strictEqual(multipleSheets.mergedCsv, 'key,ko\nWD001,번역');
				assert.deepStrictEqual(await fetchAllSheetNames(credential, 'sheet-id'), ['WD']);
				assert.strictEqual(requests.length, 3);

				for (const { config } of requests) {
					if (credential.type === 'oauth') {
						assert.strictEqual(config?.headers?.Authorization, 'Bearer test-access-token');
						assert.strictEqual(config?.params.key, undefined);
						continue;
					}
					assert.strictEqual(config?.params.key, 'test-api-key');
					assert.strictEqual(config?.headers?.Authorization, undefined);
				}
				assert.strictEqual(requests[0].config?.params.fields, undefined);
				assert.strictEqual(requests[1].config?.params.fields, undefined);
				assert.strictEqual(requests[2].config?.params.fields, 'sheets.properties.title');
			} finally {
				axios.get = originalGet;
			}
		});
	}
});
