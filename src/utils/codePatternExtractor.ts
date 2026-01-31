export const createCodePattern = (sheetNames: string[]): RegExp => {
	if (sheetNames.length === 0) {
		return /(WD|ST|CD)\d+/;
	}

	const pattern = sheetNames
		.map((name) => name.trim())
		.filter((name) => name.length > 0)
		.join('|');

	return new RegExp(`(${pattern})\\d+`);
};

export const extractCodeFromText = (
	text: string,
	pattern: RegExp
): string | null => {
	const match = text.match(pattern);
	return match ? match[0] : null;
};
