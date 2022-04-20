const getSelectOptions = (
	items: string[],
): Array<{ label: string; value: string }> => {
	return items.map((label) => ({
		label,
		value: label,
	}));
};

export { getSelectOptions };
