import { createRouter, createWebHashHistory } from "vue-router";

import welcomeVue from "~/components/welcome.vue";
import add_goodsVue from "~/components/milktea/add_goods.vue";
import modify_milkteaVue from "~/components/milktea/modify_milktea.vue";
import sample_modifyVue from "~/components/milktea/sample_modify.vue";

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
		},{
			path:"/modify/:guid",
			component:sample_modifyVue
		}
	]
})