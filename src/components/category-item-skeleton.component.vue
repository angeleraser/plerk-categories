<template>
	<div class="category-item-skeleton"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'CategoryItemSkeleton',
});
</script>

<style>
@keyframes skeleton-loading {
	0% {
		background-color: hsl(200, 20%, 80%);
	}

	100% {
		background-color: hsl(200, 20%, 95%);
	}
}

.category-item-skeleton {
	display: flex;
	flex-direction: column;
	height: 190px;
	animation: skeleton-loading 1s linear infinite alternate;
	width: 100%;
	border-radius: 5px;
}
</style>
