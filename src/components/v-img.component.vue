<template>
	<div v-if="isLoading" class="v-img v-img--is-skeleton"></div>

	<img class="v-img" v-else :src="src" :alt="alt" :aria-label="ariaLabel" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'VImg',

	props: {
		alt: {
			type: String,
			required: true,
		},

		src: {
			type: String,
			required: true,
		},

		ariaLabel: {
			type: String,
			required: true,
		},
	},

	created: function () {
		const image = new Image();

		image.src = this.src;

		image.onload = () => {
			this.isLoading = false;
		};
	},

	data: function () {
		return {
			isLoading: true,
		};
	},
});
</script>

<style>
@keyframes skeleton-loading {
	0% {
		background-color: hsl(200, 20%, 70%);
	}

	100% {
		background-color: hsl(200, 20%, 95%);
	}
}

.v-img {
	display: inline-block;
	width: 100%;
	height: 100%;
}

.v-img--is-skeleton {
	animation: skeleton-loading 1s linear infinite alternate;
}
</style>
