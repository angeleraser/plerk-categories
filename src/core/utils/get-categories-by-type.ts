import { Category, CategoryType } from '../domain/models/category';

const getCategoriesByType = (
	categories: Array<Category>,
	typeLabel: CategoryType,
): Category[] => {
	return categories.filter(({ type }) => {
		return type === typeLabel;
	});
};

export { getCategoriesByType };
