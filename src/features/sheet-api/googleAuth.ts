import { JWT } from 'google-auth-library';

const SHEETS_READ_SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

export const getAccessTokenFromServiceAccountJson = async (
	serviceAccountJson: string
): Promise<string> => {
	const trimmed = serviceAccountJson.trim();
	if (!trimmed) {
		throw new Error('서비스 계정 JSON을 입력해주세요.');
	}

	let credentials: Record<string, unknown>;
	try {
		credentials = JSON.parse(trimmed) as Record<string, unknown>;
	} catch {
		throw new Error('서비스 계정 JSON 형식이 올바르지 않습니다.');
	}

	const clientEmail = credentials.client_email;
	const privateKey = credentials.private_key;
	if (typeof clientEmail !== 'string' || typeof privateKey !== 'string') {
		throw new Error(
			'서비스 계정 JSON에 client_email, private_key가 필요합니다.'
		);
	}

	const client = new JWT({
		email: clientEmail,
		key: privateKey,
		scopes: [SHEETS_READ_SCOPE]
	});

	const tokenResponse = await client.getAccessToken();
	const token = tokenResponse.token;
	if (!token) {
		throw new Error('액세스 토큰을 받지 못했습니다.');
	}
	return token;
};
