<template>
	<div class="select-input-wrapper">
		<select
			:disabled="disabled"
			:value="value"
			class="select"
			@input="(event) => $emit('input', event.target.value)"
		>
			<option
				:key="option.label"
				v-for="option in options"
				:value="option.value"
			>
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'SelectInput',

	props: {
		options: {
			type: Array as () => Array<{ label: string; value: string }>,
			default: [],
		},

		value: {
			type: String,
		},

		disabled: {
			type: Boolean,
		},
	},
});
</script>

<style>
.select-input-wrapper {
	height: 54px;
	width: 100%;
	min-width: 160px;
}

.select-input-wrapper .select {
	display: inline-block;
	height: 100%;
	width: 100%;
}

.select-input-wrapper .select {
	font-size: 14px;
	font-family: var(--font-spartan);
	border: 2px solid var(--grey);
	border-radius: 6px;
	padding: 0 6px;
}

.select-input-wrapper .select:focus {
	outline-color: var(--primary);
}
</style>
