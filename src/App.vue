<template>
	<div id="app">
		<div class="header">
			<h1 class="header-title">Category Search</h1>
			<span class="material-icons header-title-icon"> pageview </span>
		</div>

		<div class="main-content">
			<div class="main-content-form">
				<form @submit.prevent="searchCategoriesByName">
					<div class="main-content-form-text-field">
						<search-input-component
							v-model="searchQuery"
							placeholder="Search by name"
						/>
						<button type="submit">
							<span class="material-icons"> search </span>
						</button>
					</div>

					<div class="main-content-form-filters">
						<select-input-component
							:options="categoryTypeOptions"
							v-model="typeFilter"
							:disabled="loading"
						/>

						<select-input-component
							:disabled="loading"
							:options="categoryPriceOptions"
							v-model="priceSortFilter"
						/>
					</div>
				</form>
			</div>

			<div class="category-items">
				<template v-if="!Boolean(error) && !loading">
					<category-item-component
						v-for="category in categoryItems"
						:key="category.id"
						:img-src="category.image"
						:name="category.name"
						:type="category.type"
						:price="category.price"
					/>
				</template>

				<template v-if="loading">
					<category-item-skeleton-component v-for="n in 9" :key="n" />
				</template>

				<template v-if="error && !loading">
					<div class="category-items-message">
						<span class="material-icons"> error </span>
						{{ error }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ApiCategoriesService } from './core/services/api.categories.service';
import { Category, CategoryType } from './core/domain/models/category';
import { CATEGORY_TYPES } from './core/constants/category-types';
import {
	CATEGORY_PRICE_LABELS,
	PriceLabels,
} from './core/constants/category-price-labels';
import CategoryItemComponent from './components/category-item.component.vue';
import CategoryItemSkeletonComponent from './components/category-item-skeleton.component.vue';
import SearchInputComponent from './components/search-input.component.vue';
import SelectInputComponent from './components/select-input.component.vue';
import Vue from 'vue';

const CategoriesService = new ApiCategoriesService();

const getSelectOptions = (items: string[]) => {
	return items.map((label) => ({
		label,
		value: label,
	}));
};

export default Vue.extend({
	name: 'App',

	components: {
		SearchInputComponent,
		CategoryItemComponent,
		CategoryItemSkeletonComponent,
		SelectInputComponent,
	},

	methods: {
		searchCategoriesByName: async function () {
			if (!this.searchQuery) return;

			const categories = await CategoriesService.filterByName(
				this.categories,
				this.searchQuery,
			);

			this.setCategoryItems(categories);
		},

		fetchAllCategories: async function () {
			try {
				this.loading = true;
				const data = await CategoriesService.getAll();

				this.categories = data;
				this.setCategoryItems(this.categories);
			} catch {
				this.error =
					'Ha ocurrido un error al obtener los datos, por favor, intentalo de nuevo';
			} finally {
				this.loading = false;
			}
		},

		setCategoryItems: function (items: Array<Category>) {
			if (items.length === 0) {
				this.error = 'No se encontraron categorias para mostrar.';
				this.categoryItems = [];
				return;
			}

			this.categoryItems = items;
			this.error = '';
		},

		sortCategoriesByPrice: async function (
			categories: Array<Category>,
			order: PriceLabels,
		) {
			if (order === 'Mayor precio') {
				return void this.setCategoryItems(
					await CategoriesService.sortByPrice(categories, 'high'),
				);
			}

			if (order === 'Menor precio') {
				return void this.setCategoryItems(
					await CategoriesService.sortByPrice(categories, 'low'),
				);
			}
		},

		getFilteredCategoriesByType: async function () {
			if (this.typeFilter === 'Todas') return this.categoryListToFilter;

			return CategoriesService.filterByType(
				this.categoryListToFilter,
				this.typeFilter,
			);
		},
	},

	computed: {
		categoryListToFilter: function (): Array<Category> {
			const categories = this.searchQuery
				? this.categoryItems
				: this.categories;

			return categories;
		},
	},

	watch: {
		searchQuery: async function (value) {
			if (!value) {
				const categories = await this.getFilteredCategoriesByType();
				this.sortCategoriesByPrice(categories, this.priceSortFilter);
			}
		},

		typeFilter: async function (value): Promise<void> {
			if (value === 'Todas') {
				return void this.setCategoryItems(this.categoryListToFilter);
			}

			this.setCategoryItems(
				await CategoriesService.filterByType(this.categoryListToFilter, value),
			);
		},

		priceSortFilter: async function (value): Promise<void> {
			const categories = await this.getFilteredCategoriesByType();
			this.sortCategoriesByPrice(categories, value);
		},
	},

	created: function () {
		this.fetchAllCategories();
	},

	data: function () {
		return {
			categories: [] as Array<Category>,
			categoryItems: [] as Array<Category>,
			error: '',
			loading: false,
			priceSortFilter: 'Mayor precio' as PriceLabels,
			searchQuery: '',
			typeFilter: 'Todas' as CategoryType | 'Todas',
			categoryTypeOptions: [
				{ label: 'Todas', value: 'Todas' },
				...getSelectOptions(Object.values(CATEGORY_TYPES)),
			],
			categoryPriceOptions: getSelectOptions(
				Object.values(CATEGORY_PRICE_LABELS),
			),
		};
	},
});
</script>

<style>
@import url('./assets/css/styles.css');

#app {
	background-color: #f2f2f2;
	min-height: 100vh;
	min-width: 360px;
	width: 100%;
}

.header {
	height: 200px;
	width: 100%;
	background-color: var(--primary);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 22px;
}

.header-title {
	font-size: 26px;
	font-weight: 600;
	font-family: var(--font-spartan);
	color: var(--white);
}

.header-title-icon {
	font-size: 60px;
	color: var(--warning);
	margin-left: 12px;
}

.main-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.main-content-form,
.main-content-form-text-field,
.main-content form {
	display: flex;
	justify-content: center;
	width: 100%;
}

.main-content-form-text-field {
	flex-shrink: 0;
}

.main-content-form {
	margin-bottom: 30px;
	position: sticky;
	z-index: 50;
	top: 0;
	background-color: var(--white);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	padding: 22px;
}

.main-content form {
	max-width: 480px;
	flex-direction: column;
	align-items: center;
}

.main-content form button {
	display: flex;
	color: var(--white);
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 54px;
	background-color: var(--primary);
	border-radius: 0 6px 6px 0;
}

.main-content search-input input {
	border-radius: 6px 0 0 6px;
}

.main-content-form-filters {
	display: flex;
	align-items: center;
	margin-top: 16px;
	width: 100%;
}

.main-content-form-filters > .select-input:not(:last-child) {
	margin-right: 12px;
}

.category-items {
	padding: 30px;
	display: grid;
	gap: 60px;
	width: 100%;
	place-content: center;
	grid-template-columns: minmax(160px, 460px);
	max-width: 1280px;
}

.category-items-message {
	font-family: var(--font-spartan);
	font-size: 18px;
	color: var(--negative);
	font-weight: 600;
	text-align: center;
	grid-column: span 3;
	max-width: 480px;
	display: flex;
	align-items: center;
	place-self: center;
}

.category-items-message .material-icons {
	margin-right: 8px;
}

@media screen and (min-width: 1024px) {
	.category-items {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.header-title {
		font-size: 46px;
	}

	.main-content form {
		flex-direction: row;
		align-items: center;
	}

	.main-content-form-filters {
		margin-top: 0;
		margin-left: 12px;
	}
}
</style>
