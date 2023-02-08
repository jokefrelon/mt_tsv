import { createRouter, createWebHashHistory } from "vue-router";

import welcomeVue from "~/components/welcome.vue";

export default createRouter({
	history: createWebHashHistory(undefined),
	routes: [
		{
			path: "/",
			component: welcomeVue
		}
	]
})