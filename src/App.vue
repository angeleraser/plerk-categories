<template>
	<div id="app">
		<div class="header">
			<h1 class="header-title">Category Search</h1>
			<span class="material-icons header-title-icon"> pageview </span>
		</div>

		<div class="main-content">
			<div class="main-content-form">
				<form @submit.prevent="searchCategoriesByName">
					<search-input-component
						v-model="searchQuery"
						placeholder="Search by name"
					/>
					<button type="submit">
						<span class="material-icons"> search </span>
					</button>
				</form>
			</div>

			<div class="category-items">
				<category-item-component
					v-for="category in categoryItems"
					:key="category.id"
					:img-src="category.image"
					:name="category.name"
					:type="category.type"
					:price="category.price"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ApiCategoriesService } from './core/services/api.categories.service';
import { Category } from './core/domain/models/category';
import SearchInputComponent from './components/search-input.component.vue';
import Vue from 'vue';
import CategoryItemComponent from './components/category-item.component.vue';

const CategoriesService = new ApiCategoriesService();

export default Vue.extend({
	name: 'App',

	components: { SearchInputComponent, CategoryItemComponent },

	methods: {
		searchCategoriesByName: async function () {
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
				this.setCategoryItems(data);
			} catch {
				this.error =
					'Ha ocurrido un error al obtener los datos, por favor, intentalo de nuevo';
			} finally {
				this.loading = false;
			}
		},

		setCategoryItems: function (items: Array<Category>) {
			if (items.length === 0) {
				this.error = 'No se encontraron categorias';
				return;
			}

			this.categoryItems = items;
			this.error = '';
		},
	},

	watch: {
		searchQuery: function (value) {
			if (!value) {
				this.categoryItems = this.categories;
			}
		},
	},

	created: function () {
		this.fetchAllCategories();
	},

	data: function () {
		return {
			searchQuery: '',
			categoryItems: [] as Array<Category>,
			categories: [] as Array<Category>,
			error: '',
			loading: false,
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
}

.header-title {
	font-size: 46px;
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
.main-content form {
	display: flex;
	justify-content: center;
	width: 100%;
}

.main-content-form {
	margin-bottom: 80px;
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

.main-content form .search-input {
	width: 100%;
}

.main-content form input {
	border-radius: 6px 0 0 6px;
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

@media screen and (min-width: 1024px) {
	.category-items {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
</style>
