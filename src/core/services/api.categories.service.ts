import { api } from '@/boot/axios';
import { CATEGORY_TYPES } from '../constants/category-types';
import {
	ApiCategory,
	ApiCategoryLabel,
	ApiResponse,
} from '../domain/models/api-response';
import { CategoriesService } from '../domain/services/categories.service';
import { Category } from '../domain/models/category';
import { CATEGORY_DEFAULT_IMAGE } from '../constants/category-default-image';

class ApiCategoriesService extends CategoriesService {
	public async getAll(): Promise<Category[]> {
		const { data } = await api.get<ApiResponse>('/category');
		const { data: categories } = data;
		return await this.mapFromApi(categories);
	}

	private mapFromApi(categories: Array<ApiCategory>) {
		const mappedCategories = categories.map(
			async (category) => await this.createCategory(category, 'esp'),
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
			image: this.processImageURL(image),
			price: suggested_budget / 100,
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

	private processImageURL = (url: string | null): string => {
		if (!url) return CATEGORY_DEFAULT_IMAGE;

		const validationRegexp = /https/gi;
		const matches = url.match(validationRegexp);

		if (!matches || matches.length > 1) return CATEGORY_DEFAULT_IMAGE;

		return url;
	};
}

export { ApiCategoriesService };
