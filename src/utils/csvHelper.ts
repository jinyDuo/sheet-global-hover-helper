export const padRowToMatchHeader = (row: string[], headerLength: number): string[] => {
	const paddedRow = [...row];
	while (paddedRow.length < headerLength) {
		paddedRow.push('');
	}
	return paddedRow;
};
