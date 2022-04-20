<template>
	<div class="search-input">
		<input
			:value="value"
			@input="(event) => $emit('input', event.target.value)"
			type="text"
			:placeholder="placeholder"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		placeholder: { type: String },

		value: {
			type: String,
		},
	},

	name: 'SearchInput',
});
</script>

<style>
.search-input {
	min-height: 52px;
}

.search-input input {
	height: 100%;
	width: 100%;
	outline: none;
	border: 2px solid var(--grey);
	padding: 0 10px;
	transition: 0.3s all;
	border-right-color: var(--primary);
	font-family: var(--font-spartan);
	font-size: 14px;
}

.search-input input:focus {
	border: 2px solid var(--primary);
}
</style>
