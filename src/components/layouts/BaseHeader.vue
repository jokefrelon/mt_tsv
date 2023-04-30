<script lang="ts" setup>
import { toggleDark } from '~/composables';

</script>

<template>
	<el-menu
		class="el-menu-demo"
		mode="horizontal"
		style="display: flex;justify-content: center"
	>

		<RouterLink to="/buy">
			<el-menu-item index="1">
				<el-icon>
					<IceDrink />
				</el-icon>
				Ikun奶茶
			</el-menu-item>
		</RouterLink>

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

			<RouterLink to="/modify">
				<el-menu-item index="2-3">产品调整</el-menu-item>
			</RouterLink>

			<RouterLink to="/series">
				<el-menu-item index="2-4">
					分类设置
				</el-menu-item>
			</RouterLink>

		</el-sub-menu>

		<RouterLink to="/order">
			<el-menu-item index="3">
				<el-icon>
					<Tickets />
				</el-icon>
				订单
			</el-menu-item>
		</RouterLink>


		<el-sub-menu index="4">
			<template #title>
				<el-icon>
					<Briefcase />
				</el-icon>
				采购
			</template>

			<RouterLink to="/buyfruit">
				<el-menu-item index="4-1">水果/食品</el-menu-item>
			</RouterLink>

			<RouterLink to="/buydaily">
				<el-menu-item index="4-2">消耗品</el-menu-item>
			</RouterLink>

			<RouterLink to="/buyother">
				<el-menu-item index="4-3">其他</el-menu-item>
			</RouterLink>

		</el-sub-menu>

		<el-sub-menu index="5">

			<template #title>
				<el-icon>
					<Avatar />
				</el-icon>
				员工
			</template>
			<RouterLink to="/leave">
				<el-menu-item index="5-1">请假</el-menu-item>
			</RouterLink>

			<RouterLink to="/clockin">
				<el-menu-item index="5-2">打卡</el-menu-item>
			</RouterLink>

			<RouterLink to="/welfare">
				<el-menu-item index="5-4">福利</el-menu-item>
			</RouterLink>


		</el-sub-menu>

		<el-sub-menu index="6">

			<template #title>
				<el-icon>
					<Box />
				</el-icon>
				其他
			</template>

			<RouterLink to="/cheapcode">
				<el-menu-item index="6-1">优惠码</el-menu-item>
			</RouterLink>


		</el-sub-menu>

		<el-menu-item
			h="full"
			@click="toggleDark()"
			index="7"
		>
			<button
				class="border-none w-full bg-transparent cursor-pointer"
				style="height: var(--ep-menu-item-height);"
			>
				<i
					inline-flex
					i="dark:ep-moon ep-sunny"
				/>
			</button>
		</el-menu-item>


		<el-sub-menu
			index="8"
			style="display: flex;width: auto;"
		>

			<template #title>
				<el-icon>
					<User />
				</el-icon>
				{ { User } }
			</template>
			<RouterLink to="/user_manage">
				<el-menu-item index="8-1">账号管理</el-menu-item>
			</RouterLink>

			<el-menu-item index="8-2">
				退出
			</el-menu-item>
		</el-sub-menu>

	</el-menu>
</template>

<style scoped>
.ep-menu-item {
	align-items: center;
	justify-content: space-evenly;
}
</style>
