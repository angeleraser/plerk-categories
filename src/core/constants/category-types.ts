import { CategoryType } from '../domain/models/category';

const CATEGORY_TYPES: {
	[index: number]: CategoryType;
} = {
	1: 'Normal',
	2: 'Libre',
	3: 'Personalizada',
};

export { CATEGORY_TYPES };
