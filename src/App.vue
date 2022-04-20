<template>
	<div id="app">
		<div class="header">
			<h1 class="header-title">Category Search</h1>
			<span class="material-icons header-icon"> pageview </span>
		</div>

		<main class="main">
			<div class="form-container">
				<form class="form" @submit.prevent="searchCategoriesByName">
					<div class="form-text-field">
						<search-input v-model="categoryName" placeholder="Search by name" />
						<button class="submit-btn" type="submit">
							<span class="material-icons"> search </span>
						</button>
					</div>

					<div class="form-filters">
						<select-input
							:options="categoryTypeOptions"
							v-model="categoryType"
							:disabled="loading"
						/>

						<select-input
							:disabled="loading"
							:options="categoryPriceOptions"
							v-model="categoryPriceSort"
						/>
					</div>
				</form>
			</div>

			<div class="grid-container">
				<category-item
					v-for="category in categoryItems"
					:key="category.id"
					:img-src="category.image"
					:name="category.name"
					:type="category.type"
					:price="category.price"
				/>

				<template v-if="loading">
					<category-item-skeleton v-for="n in 9" :key="n" />
				</template>

				<template v-if="error && !loading">
					<div class="error-message">
						<span class="material-icons"> error </span>
						{{ error }}
					</div>
				</template>
			</div>
		</main>
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
import { getSelectOptions } from './core/utils/get-select-options';
import CategoryItem from './components/category-item.vue';
import CategoryItemSkeleton from './components/category-item-skeleton.vue';
import SearchInput from './components/search-input.vue';
import SelectInput from './components/select-input.vue';
import Vue from 'vue';

const CategoriesService = new ApiCategoriesService();

export default Vue.extend({
	name: 'App',

	components: {
		SearchInput,
		CategoryItem,
		CategoryItemSkeleton,
		SelectInput,
	},

	methods: {
		searchCategoriesByName: async function () {
			if (!this.categoryName) return;

			const categories = await CategoriesService.filterByName(
				this.categories,
				this.categoryName,
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
			if (this.categoryType === 'Todas') return this.categoryListToFilter;

			return CategoriesService.filterByType(
				this.categoryListToFilter,
				this.categoryType,
			);
		},
	},

	computed: {
		categoryListToFilter: function (): Array<Category> {
			const categories = this.categoryName
				? this.categoryItems
				: this.categories;

			return categories;
		},
	},

	watch: {
		categoryName: async function (value) {
			if (!value) {
				const categories = await this.getFilteredCategoriesByType();
				this.sortCategoriesByPrice(categories, this.categoryPriceSort);
			}
		},

		categoryType: async function (value): Promise<void> {
			if (value === 'Todas') {
				return void this.setCategoryItems(this.categoryListToFilter);
			}

			this.setCategoryItems(
				await CategoriesService.filterByType(this.categoryListToFilter, value),
			);
		},

		categoryPriceSort: async function (value): Promise<void> {
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
			categoryPriceSort: 'Mayor precio' as PriceLabels,
			categoryName: '',
			categoryType: 'Todas' as CategoryType | 'Todas',
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

.header-icon {
	font-size: 60px;
	color: var(--warning);
	margin-left: 12px;
}

.main {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.form-container,
.form-text-field,
.form {
	display: flex;
	justify-content: center;
	width: 100%;
}

.form-text-field {
	flex-shrink: 0;
}

.form-container {
	margin-bottom: 30px;
	position: sticky;
	z-index: 50;
	top: 0;
	background-color: var(--white);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	padding: 22px;
}

.form {
	max-width: 480px;
	flex-direction: column;
	align-items: center;
}

.form .submit-btn {
	display: flex;
	color: var(--white);
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 54px;
	background-color: var(--primary);
	border-radius: 0 6px 6px 0;
}

.search-input-wrapper .input {
	border-radius: 6px 0 0 6px;
}

.form-filters {
	display: flex;
	align-items: center;
	margin-top: 16px;
	width: 100%;
}

.form-filters > .select-input-wrapper:not(:last-child) {
	margin-right: 12px;
}

.grid-container {
	padding: 30px;
	display: grid;
	gap: 60px;
	width: 100%;
	place-content: center;
	grid-template-columns: minmax(160px, 460px);
	max-width: 1280px;
}

.error-message {
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

.error-message .material-icons {
	margin-right: 8px;
}

@media screen and (min-width: 1024px) {
	.grid-container {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.header-title {
		font-size: 46px;
	}

	.form {
		flex-direction: row;
		align-items: center;
	}

	.form-filters {
		margin-top: 0;
		margin-left: 12px;
	}
}
</style>
