import { createRouter, createWebHashHistory } from "vue-router";

import welcomeVue from "~/components/welcome.vue";
import add_goodsVue from "~/components/milktea/add_goods.vue";
import modify_milkteaVue from "~/components/milktea/modify_milktea.vue";
import sample_modifyVue from "~/components/milktea/sample_modify.vue";
import series_manageVue from "~/components/milktea/series_manage.vue";
import shopping_timeVue from "~/components/milktea/shopping_time.vue";
import orderVue from "~/components/order/order.vue";

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
		},{
			path:"/series",
			component:series_manageVue
		},{
			path:"/buy",
			component:shopping_timeVue
		},{
			path:"/order",
			component:orderVue
		}
	]
})