import Vue from 'vue';
import App from './App.vue';
import { ApiCategoriesService } from './core/services/api.categories.service';

Vue.config.productionTip = false;

const service = new ApiCategoriesService();

(async function () {
	const categories = await service.getAll({ lang: 'eng' });

	console.log({
		categories,
		byName: await service.filterByName(categories, 'quality'),
		byType: await service.filterByType(categories, 'Personalizada'),
	});
})();

new Vue({
	render: (h) => h(App),
}).$mount('#app');
