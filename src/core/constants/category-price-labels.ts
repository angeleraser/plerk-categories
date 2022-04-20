const CATEGORY_PRICE_LABELS: { [key: string]: PriceLabels } = {
	high: 'Mayor precio',
	low: 'Menor precio',
};

type PriceLabels = 'Mayor precio' | 'Menor precio';

export type { PriceLabels };

export { CATEGORY_PRICE_LABELS };
