import axios from 'axios';
import { handleApiError } from './errorHandler';

export const fetchDictionaryData = async (url: string): Promise<string> => {
	if (!url) {
		throw new Error('URL이 비어있습니다.');
	}

	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};



