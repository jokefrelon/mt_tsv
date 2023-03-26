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
			>
				<template #default="$index">
					<div style="display: flex;align-items: center;justify-content: center;flex-wrap: wrap;">
						<span
							style="margin: 2px 3px;"
							v-for=" (v, k) in JSON.parse($index.row.order_detail)"
						>
							<el-tag
								size="large"
								type="warning"
							> {{ milkteaData[k] }} x {{ v }}</el-tag>
						</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				sortable
				prop="order_time"
				label="创建时间"
				width="190"
			/>
			<el-table-column
				sortable
				:sort-method="moneyDIYsort"
				prop="money"
				label="金额"
				width="110"
			/>
			<el-table-column
				sortable
				prop="refund"
				label="退款"
				width="110"
			>
				<template #default="row">
					<span
						style="color: var(--ep-color-success);"
						v-if="row.row.refund == 0"
					>
						否
					</span>
					<span
						style="color: var(--ep-color-error);"
						v-else
					>是</span>
				</template>
			</el-table-column>
			<el-table-column
				sortable
				prop="pay_method"
				label="支付方式"
				width="120"
			/>
			<el-table-column
				sortable
				prop="paid"
				label="支付状态"
				width="120"
			>
				<template #default="row">
					<span
						style="color: var(--ep-color-success);"
						v-if="row.row.paid == 'Y'"
					>
						已支付
					</span>
					<span
						style="color: var(--ep-color-error);font-weight: bold;"
						v-else
					>
						未支付
					</span>
				</template>
			</el-table-column>
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
						v-if="scope.row.refund == 0 && scope.row.paid == 'Y'"
						size="small"
						type="info"
						@click="handleRefund(scope.row)"
					>退款</el-button>
					<el-button
						v-else
						size="small"
						disabled
					>退款</el-button>
					<el-button
						size="small"
						type="danger"
						@click="handleDelete(scope.row)"
					>删除</el-button>
				</template>
			</el-table-column>

		</el-table>

	</div>

	<div class="demo-pagination-block">
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[3, 5, 10]"
			:small="small"
			:disabled="disabled"
			:background="background"
			layout="total, sizes, prev, pager, next, jumper"
			:total=total
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
const milkteaData: any = ref({})

const table_outbox = ref()

const search = ref()

const total = ref(0)

const currentPage = ref(1)
const pageSize = ref(3)

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const pageHeight = ref(0)
const pageHeightY = ref("")


const initFunc = () => {
	pageHeight.value = table_outbox.value.getBoundingClientRect().y + 32;
	pageHeightY.value = pageHeight.value + "px"
}

async function getPageMilkteaData() {
	getOrderPageList(currentPage.value, pageSize.value).then(e => {
		if (!e.errorStatus) {
			pageListData.value = e.dataList
			total.value = parseInt(e.msg)
		}
	})
}

onBeforeMount(() => {
	getPageMilkteaData();
	getMilkteaList().then(e => {
		if (!e.errorStatus) {
			let ele = e.dataList;
			for (let index = 0; index < ele.length; index++) {
				const element = ele[index];
				milkteaData.value[element.guid] = element.name;
			}
		}
	});
})

onMounted(() => {
	initFunc()
})

const moneyDIYsort = (a: any, b: any) => {
	return parseFloat(a.money) - parseFloat(b.money)
}

const handleRefund = (order: any) => {
	console.log(order);
}

const handleDelete = (ordedr: any) => {

}

async function handleCurrentChange(x: number) {
	currentPage.value = x
	getPageMilkteaData()
}

async function handleSizeChange (x: number) {
	pageSize.value = x
	getPageMilkteaData()
}



</script>

<style scoped>
:deep(.cell) {
	text-align: center;
}

:deep(.ep-table__body .ep-table_1_column_2 .cell) {
	text-align: start;
}

.box {
	height: calc(100vh - v-bind(pageHeightY));
}
</style>