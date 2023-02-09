import { createRouter, createWebHashHistory } from "vue-router";

import welcomeVue from "~/components/welcome.vue";
import add_goodsVue from "~/components/milktea/add_goods.vue";

export default createRouter({
	history: createWebHashHistory(undefined),
	routes: [
		{
			path: "/",
			component: welcomeVue
		},{
			path:"/addnew",
			component:add_goodsVue
		}
	]
})