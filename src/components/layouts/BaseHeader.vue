<script lang="ts" setup>
import { toggleDark } from '~/composables';

</script>

<template>
	<el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">

		<el-menu-item index="1">
			<el-icon>
				<IceDrink />
			</el-icon>
			Ikun奶茶
		</el-menu-item>
		<el-sub-menu index="2">

			<template #title>
				<el-icon>
					<Shop />
				</el-icon>
				奶茶
			</template>

			<router-link to="/">
				<el-menu-item index="2-1">
					销售概览
				</el-menu-item>
			</router-link>


			<router-link to="/addnew">
				<el-menu-item index="2-2">
					新品上架
				</el-menu-item>
			</router-link>


			<el-menu-item index="2-3">产品调整</el-menu-item>

			<el-sub-menu index="2-4">
				<template #title>分类设置</template>
				<el-menu-item index="2-4-1">啦啦啦</el-menu-item>
				<el-menu-item index="2-4-2">略略略</el-menu-item>
				<el-menu-item index="2-4-3">哈哈哈</el-menu-item>
			</el-sub-menu>

			<el-menu-item index="2-5">标签设置</el-menu-item>

		</el-sub-menu>

		<el-menu-item index="3">
			<el-icon>
				<Tickets />
			</el-icon>
			订单
		</el-menu-item>
		
		<el-sub-menu index="4">
			<template #title>
				<el-icon>
					<Briefcase />
				</el-icon>
				采购
			</template>

			<el-menu-item index="4-1">水果/食品</el-menu-item>

			<el-menu-item index="4-2">消耗品</el-menu-item>

			<el-menu-item index="4-3">其他</el-menu-item>
		</el-sub-menu>
		
		<el-sub-menu index="5">
			
			<template #title>
				<el-icon>
					<Avatar />
				</el-icon>
				员工
			</template>

			<el-menu-item index="5-1">请假/调休</el-menu-item>

			<el-menu-item index="5-2">打卡/补卡</el-menu-item>

			<el-menu-item index="5-3">薪资明细</el-menu-item>

			<el-menu-item index="5-4">专属福利</el-menu-item>

			<el-menu-item index="5-5">账号管理</el-menu-item>

		</el-sub-menu>

		<el-sub-menu index="6">
		
			<template #title>
				<el-icon>
					<Box />
				</el-icon>
				其他
			</template>
		
			<el-menu-item index="6-1">优惠码</el-menu-item>

			<el-menu-item index="6-2">排班表</el-menu-item>
			
		</el-sub-menu>

		<el-menu-item h="full" @click="toggleDark()" index="7">
			<button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height);">
				<i inline-flex i="dark:ep-moon ep-sunny" />
			</button>
		</el-menu-item>

		<div class="flex-grow"></div>

		<el-sub-menu index="8">

			<template #title>
				<el-icon>
					<User />
				</el-icon>
				{ { User } }
			</template>

			<el-menu-item index="8-1">
				个人资料
			</el-menu-item>

			<el-menu-item index="8-2">
				退出
			</el-menu-item>
		</el-sub-menu>

	</el-menu>
</template>

<style>
.flex-grow {
	flex-grow: 1;
}
</style>
