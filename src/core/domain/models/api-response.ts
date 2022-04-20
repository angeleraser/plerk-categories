type ApiCategoryLabel = {
	esp: string;
	eng: string;
};

interface ApiCategory {
	name: ApiCategoryLabel;
	image: string;
	description: ApiCategoryLabel;
	suggested_budget: number;
	uuid4: string;
	category_type: number;
	have_subcategories: boolean;
	vendors: null | unknown;
}

interface ApiResponse {
	data: Array<ApiCategory>;
	status: string;
}

export type { ApiResponse, ApiCategory, ApiCategoryLabel };
