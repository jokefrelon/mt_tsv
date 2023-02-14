import { createRouter, createWebHashHistory } from "vue-router";

import welcomeVue from "~/components/welcome.vue";
import add_goodsVue from "~/components/milktea/add_goods.vue";
import modify_milkteaVue from "~/components/milktea/modify_milktea.vue";

export default createRouter({
	history: createWebHashHistory(undefined),
	routes: [
		{
			path: "/",
			component: welcomeVue
		},{
			path:"/addnew",
			component:add_goodsVue
		},{
			path:"/modify",
			component:modify_milkteaVue
		}
	]
})