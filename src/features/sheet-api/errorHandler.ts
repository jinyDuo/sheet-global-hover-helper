import axios from 'axios';

type ApiErrorResponse = {
	error?: {
		code: number;
		message: string;
		status: string;
	};
};

const createApiErrorMessage = (apiError: ApiErrorResponse['error'], status: number): string => {
	if (!apiError) {
		return `API 요청 실패 (${status})`;
	}

	const baseErrorMessage = `구글 시트 API 오류: ${apiError.message || apiError.status || '알 수 없는 오류'}`;

	const statusMessages: Record<number, string> = {
		403: '\n\n가능한 원인:\n- API 키가 유효하지 않거나 Google Sheets API가 활성화되지 않았습니다\n- 시트가 "링크가 있는 모든 사용자"로 공유되지 않았습니다\n- API 키 제한 설정을 확인하세요',
		404: '\n\n가능한 원인:\n- 시트 ID가 잘못되었습니다\n- 시트가 삭제되었거나 접근 권한이 없습니다',
		400: '\n\n가능한 원인:\n- 시트 이름이 잘못되었습니다\n- API 요청 형식이 잘못되었습니다'
	};

	const additionalMessage = statusMessages[status];
	if (!additionalMessage) {
		return baseErrorMessage;
	}

	return baseErrorMessage + additionalMessage;
};

const handleAxiosError = (error: unknown): Error => {
	if (!axios.isAxiosError(error)) {
		return error instanceof Error ? error : new Error('알 수 없는 오류');
	}

	if (!error.response) {
		if (error.request) {
			return new Error('네트워크 오류: 서버에 연결할 수 없습니다.');
		}
		return new Error('네트워크 요청 실패');
	}

	const status = error.response.status;
	const errorData = error.response.data as ApiErrorResponse;

	if (errorData?.error) {
		return new Error(createApiErrorMessage(errorData.error, status));
	}

	const errorMessage = `API 요청 실패: ${error.response.statusText} (${status})`;
	const responseData = JSON.stringify(errorData).substring(0, 200);

	return new Error(`${errorMessage}\n\n응답 데이터: ${responseData}`);
};

export const handleApiError = (error: unknown): Error => {
	return handleAxiosError(error);
};

export const createSheetError = (sheetName: string, error: unknown): Error => {
	const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
	return new Error(`시트 "${sheetName}" 가져오기 실패: ${errorMessage}`);
};
