<template>
	<div
		ref="table_outbox"
		class="box"
	>
		<el-table
			:data="pageListData"
			height="100%"
			stripe
			empty-text="无数据"
		>
			<el-table-column
				fixed
				prop="ouid"
				label="订单号"
				width="160"
			/>
			<el-table-column
				prop="order_detail"
				label="详情"
				min-width="300"
			/>
			<el-table-column
				sortable
				prop="order_time"
				label="创建时间"
				width="190"
			/>
			<el-table-column
				sortable
				prop="money"
				label="金额"
				width="110"
			/>
			<el-table-column
				prop="refund"
				label="退款"
				width="110"
			/>
			<el-table-column
				prop="pay_method"
				label="支付方式"
				width="120"
			/>
			<el-table-column
				prop="paid"
				label="支付状态"
				width="120"
			/>
			<el-table-column
				align="right"
				width="140"
			>
				<template #header>
					<el-input
						v-model="search"
						placeholder="搜索奶茶名称"
					/>
				</template>
				<template #default="scope">
					<el-button
						size="small"
						plain
						@click="handleEdit(scope.$index, scope.row)"
					>Edit</el-button>
					<el-button
					plain
						size="small"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)"
					>Delete</el-button>
				</template>
			</el-table-column>

		</el-table>

	</div>

	<div class="demo-pagination-block">
		<el-pagination
			v-model:current-page="currentPage4"
			v-model:page-size="pageSize4"
			:page-sizes="[100, 200, 300, 400]"
			:small="small"
			:disabled="disabled"
			:background="background"
			layout="total, sizes, prev, pager, next, jumper"
			:total="400"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script setup lang="ts">

import { getOrderPageList } from "~/axios/order";
import { getMilkteaList } from "~/axios/milktea";
import { orderinfo } from "~/type";

const pageListData = ref([])
const milkteaData = ref({})

const table_outbox = ref()

const page = ref(1)
const size = ref(30)

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const pageHeight = ref(0)
const pageHeightY = ref("")




const initFunc = () => {
	pageHeight.value = table_outbox.value.getBoundingClientRect().y + 32;
	pageHeightY.value = pageHeight.value + "px"
}

onMounted(() => {
	initFunc()
})

onBeforeMount(() => {
	getOrderPageList(page.value, size.value).then(e => {
		if (!e.errorStatus) {
			pageListData.value = e.dataList
		}
		// console.log(pageListData.value);
	})
	getMilkteaList().then(e => {
		if (!e.errorStatus) {
			let ele = e.dataList
			for (let index = 0; index < ele.length; index++) {
				const element = ele[index];
					milkteaData.value[element.guid] = element.name
			}
			console.log(milkteaData.value);
		}
	})
})

</script>

<style scoped>
:deep(.cell) {
	text-align: center;
}
:deep(.ep-table__body .ep-table_1_column_2 .cell){
	text-align: start;
}
.box {
	height: calc(100vh - v-bind(pageHeightY));
}
</style>