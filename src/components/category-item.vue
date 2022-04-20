<template>
	<div class="category-item">
		<div class="category-item-data">
			<v-img-component
				:src="imgSrc"
				:alt="name"
				class="category-item-data-img"
				aria-label="Imagen de la categoria"
			/>

			<div class="category-item-data-name">
				{{ name }}
			</div>
		</div>

		<div class="category-item-info">
			<div :class="[typeTagClassname]" class="category-item-info-type">
				{{ type }}
			</div>

			<div class="category-item-info-price">
				{{ formatedPrice }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ApiCategoriesService } from '@/core/services/api.categories.service';
import { CategoryType } from '@/core/domain/models/category';
import VImgComponent from './v-img.vue';
import Vue from 'vue';

const typeTagColorNames: { [key in CategoryType]: string } = {
	Normal: 'normal',
	Personalizada: 'custom',
	Libre: 'free',
	Todas: 'all',
};

export default Vue.extend({
	components: { VImgComponent },

	name: 'CategoryItem',

	props: {
		name: { type: String, required: true },
		price: { type: Number, required: true },
		imgSrc: { type: String, required: true },
		type: { type: String as () => CategoryType, required: true },
	},

	computed: {
		typeTagClassname: function (): string {
			return `category-item-info-type-${typeTagColorNames[this.type]}`;
		},

		formatedPrice: function (): string {
			return ApiCategoriesService.formatCategoryCurrency(this.price, {
				format: 'en-US',
				currency: 'USD',
			});
		},
	},
});
</script>

<style>
.category-item {
	display: flex;
	flex-direction: column;
	background-color: var(--white);
	border-left: 5px solid var(--accent);
	border-radius: 5px;
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
	padding: 22px;
	position: relative;
	width: 100%;
	font-family: var(--font-spartan);
}

.category-item-data,
.category-item-info {
	display: flex;
	align-items: center;
	width: 100%;
}

.category-item-data-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	width: 80px;
	height: 80px;
	display: inline-block;
	border-radius: 50%;
	overflow: hidden;
	background-color: var(--grey);
	flex-shrink: 0;
}

.category-item-data-name {
	font-size: 18px;
	text-transform: capitalize;
	text-align: left;
	justify-content: flex-start;
	margin-left: 24px;
	color: var(--dark);
	font-weight: 700;
}

.category-item-info {
	margin-top: 40px;
	justify-content: space-between;
	height: 100%;
}

.category-item-info-type {
	background-color: var(--yellow);
	padding: 8px 12px;
	border-radius: 20px;
	font-weight: 600;
	font-size: 12px;
}

.category-item-info-type-normal {
	background-color: var(--normal);
}

.category-item-info-type-free {
	background-color: var(--yellow);
}

.category-item-info-type-custom {
	background-color: var(--turquoise);
}

.category-item-info-price {
	font-weight: 600;
	color: var(--positive);
}
</style>
