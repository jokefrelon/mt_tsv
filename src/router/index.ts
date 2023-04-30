import { createRouter, createWebHashHistory } from "vue-router";

import welcomeVue from "~/components/welcome.vue";
import add_goodsVue from "~/components/milktea/add_goods.vue";
import modify_milkteaVue from "~/components/milktea/modify_milktea.vue";
import sample_modifyVue from "~/components/milktea/sample_modify.vue";
import series_manageVue from "~/components/milktea/series_manage.vue";
import shopping_timeVue from "~/components/milktea/shopping_time.vue";
import orderVue from "~/components/order/order.vue";
import fruitVue from "~/components/purchase/fruit.vue";
import dailyVue from "~/components/purchase/daily.vue";
import otherVue from "~/components/purchase/other.vue";
import Clock_inVue from "~/components/staff/Clock_in.vue";
import request_for_leaveVue from "~/components/staff/request_for_leave.vue";
import cheapcodeVue from "~/components/other/cheapcode.vue";
import account_manageVue from "~/components/other/account_manage.vue";
import welfareVue from "~/components/staff/welfare.vue";


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
		},{
			path:"/buyfruit",
			component:fruitVue
		},{
			path:"/buydaily",
			component:dailyVue
		},{
			path:"/buyother",
			component:otherVue
		},{
			path:"/clockin",
			component:Clock_inVue
		},{
			path:"/leave",
			component:request_for_leaveVue
		},{
			path:"/welfare",
			component:welfareVue
		},{
			path:"/cheapcode",
			component:cheapcodeVue
		},{
			path:"/user_manage",
			component:account_manageVue
		}
	]
})