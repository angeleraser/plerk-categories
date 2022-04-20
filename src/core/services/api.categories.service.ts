import { api } from '@/boot/axios';
import { CATEGORY_TYPES } from '../constants/category-types';
import {
	ApiCategory,
	ApiCategoryLabel,
	ApiResponse,
} from '../domain/models/api-response';
import { Category } from '../domain/models/category';
import { CategoriesService } from '../domain/services/categories.service';
import { formatPrice } from '../utils/format-price';

class ApiCategoriesService extends CategoriesService {
	public async getAll(config: {
		lang: keyof ApiCategoryLabel;
	}): Promise<Category[]> {
		const { data } = await api.get<ApiResponse>('/category');
		const { data: categories } = data;
		return await this.mapFromApi(categories, config.lang);
	}

	private mapFromApi(
		categories: Array<ApiCategory>,
		lang: keyof ApiCategoryLabel,
	) {
		const mappedCategories = categories.map(
			async (category) => await this.createCategory(category, lang),
		);

		return Promise.all(mappedCategories);
	}

	private async createCategory(
		apiCategory: ApiCategory,
		lang: keyof ApiCategoryLabel,
	) {
		const { name, image, suggested_budget, category_type, uuid4 } = apiCategory;

		return {
			name: this.getCategoryLabelByLang(name, lang),
			image,
			price: this.formatCategoryCurrency(suggested_budget, {
				format: 'en-US',
				currency: 'USD',
			}),
			type: CATEGORY_TYPES[category_type],
			id: uuid4,
		};
	}

	private getCategoryLabelByLang(
		label: ApiCategoryLabel,
		lang: keyof ApiCategoryLabel,
	) {
		const name = label[lang];
		return name ? name : label['esp'];
	}

	private formatCategoryCurrency(
		value: number,
		config: { format: string; currency: string },
	) {
		return formatPrice(value / 100, config);
	}
}

export { ApiCategoriesService };
