type CategoryType = 'Normal' | 'Libre' | 'Personalizada';

interface Category {
	name: string;
	image: string;
	price: string;
	id: string;
	type: CategoryType;
}

export type { Category, CategoryType };
