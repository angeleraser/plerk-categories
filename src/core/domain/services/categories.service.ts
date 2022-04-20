import { getCategoriesByName } from '@/core/utils/get-categories-by-name';
import { getCategoriesByType } from '@/core/utils/get-categories-by-type';
import { Category, CategoryType } from '../models/category';

abstract class CategoriesService {
	abstract getAll(config: { lang: 'eng' | 'esp' }): Promise<Category[]>;

	public async filterByName(
		categories: Category[],
		query: string,
	): Promise<Category[]> {
		return getCategoriesByName(categories, query);
	}

	public async filterByType(
		categories: Array<Category>,
		type: CategoryType,
	): Promise<Category[]> {
		return getCategoriesByType(categories, type);
	}
}

export { CategoriesService };
