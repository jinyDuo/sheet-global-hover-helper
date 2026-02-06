import * as assert from 'assert';
import { getAccessTokenFromServiceAccountJson } from '../features/sheet-api/googleAuth';

const createValidServiceAccountJson = (overrides?: Partial<Record<string, string>>): string => {
	const base = {
		type: 'service_account',
		project_id: 'test-project',
		private_key_id: 'key-id',
		private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7\n-----END PRIVATE KEY-----\n',
		client_email: 'test@test-project.iam.gserviceaccount.com',
		client_id: '123456789',
		auth_uri: 'https://accounts.google.com/o/oauth2/auth',
		token_uri: 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/test%40test-project.iam.gserviceaccount.com'
	};
	return JSON.stringify({ ...base, ...overrides });
};

suite('Google Auth (서비스 계정 JSON) Test Suite', () => {
	suite('getAccessTokenFromServiceAccountJson - 유효성 검사', () => {
		test('빈 문자열이면 에러를 던진다', async () => {
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson(''),
				/서비스 계정 JSON을 입력해주세요/
			);
		});

		test('공백만 있으면 에러를 던진다', async () => {
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson('   \n\t  '),
				/서비스 계정 JSON을 입력해주세요/
			);
		});

		test('JSON이 아니면 에러를 던진다', async () => {
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson('not json'),
				/서비스 계정 JSON 형식이 올바르지 않습니다/
			);
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson('{ invalid }'),
				/서비스 계정 JSON 형식이 올바르지 않습니다/
			);
		});

		test('client_email이 없으면 에러를 던진다', async () => {
			const json = createValidServiceAccountJson();
			const parsed = JSON.parse(json) as Record<string, unknown>;
			delete parsed.client_email;
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson(JSON.stringify(parsed)),
				/서비스 계정 JSON에 client_email, private_key가 필요합니다/
			);
		});

		test('private_key가 없으면 에러를 던진다', async () => {
			const json = createValidServiceAccountJson();
			const parsed = JSON.parse(json) as Record<string, unknown>;
			delete parsed.private_key;
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson(JSON.stringify(parsed)),
				/서비스 계정 JSON에 client_email, private_key가 필요합니다/
			);
		});

		test('client_email이 문자열이 아니면 에러를 던진다', async () => {
			const json = createValidServiceAccountJson();
			const parsed = JSON.parse(json) as Record<string, unknown>;
			parsed.client_email = 123;
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson(JSON.stringify(parsed)),
				/서비스 계정 JSON에 client_email, private_key가 필요합니다/
			);
		});

		test('private_key가 문자열이 아니면 에러를 던진다', async () => {
			const json = createValidServiceAccountJson();
			const parsed = JSON.parse(json) as Record<string, unknown>;
			parsed.private_key = null;
			await assert.rejects(
				async () => getAccessTokenFromServiceAccountJson(JSON.stringify(parsed)),
				/서비스 계정 JSON에 client_email, private_key가 필요합니다/
			);
		});
	});
});
