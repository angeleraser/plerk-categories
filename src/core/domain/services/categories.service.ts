import { formatPrice } from '@/core/utils/format-price';
import { Category, CategoryType } from '../models/category';

abstract class CategoriesService {
	abstract getAll(): Promise<Category[]>;

	public async filterByName(
		categories: Category[],
		query: string,
	): Promise<Category[]> {
		return categories.filter(({ name }) => {
			if (!name) return false;
			return name.toLowerCase().includes(query.toLowerCase());
		});
	}

	public async filterByType(
		categories: Array<Category>,
		typeLabel: CategoryType,
	): Promise<Category[]> {
		return categories.filter(({ type }) => {
			return type === typeLabel;
		});
	}

	public async sortByPrice(
		categories: Array<Category>,
		sort: 'high' | 'low',
	): Promise<Category[]> {
		return [...categories].sort((a, b) => {
			return sort === 'low' ? a.price - b.price : b.price - a.price;
		});
	}

	public static formatCategoryCurrency(
		value: number,
		config: { format: string; currency: string },
	): string {
		return formatPrice(value, config);
	}
}

export { CategoriesService };
