import { Category } from '../domain/models/category';
import { CategoriesService } from '../domain/services/categories.service';
import { CATEGORIES_LIST_MOCK } from '../mocks/categories-list.mock';

class MockCategoriesService extends CategoriesService {
	public async getAll(): Promise<Category[]> {
		return CATEGORIES_LIST_MOCK as Category[];
	}
}

export { MockCategoriesService };
