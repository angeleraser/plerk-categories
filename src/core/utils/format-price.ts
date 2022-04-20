const formatPrice = (
	value: number,
	config: { format: string; currency: string },
): string => {
	const price = new Intl.NumberFormat(config.format, {
		style: 'currency',
		currency: config.currency,
		minimumFractionDigits: 0,
	}).format(value);

	return price;
};

export { formatPrice };
