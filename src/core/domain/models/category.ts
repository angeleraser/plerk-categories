type CategoryType = 'Normal' | 'Libre' | 'Personalizada' | 'Todas';

interface Category {
	name: string;
	image: string;
	price: number;
	id: string;
	type: CategoryType;
}

export type { Category, CategoryType };
