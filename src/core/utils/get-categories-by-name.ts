import { Category } from '../domain/models/category';

const getCategoriesByName = (
	categories: Array<Category>,
	query: string,
): Category[] => {
	return categories.filter(({ name }) => {
		if (!name) return false;
		return name.toLowerCase().includes(query.toLowerCase());
	});
};

export { getCategoriesByName };
