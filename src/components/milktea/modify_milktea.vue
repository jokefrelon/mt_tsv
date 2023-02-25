<template>
	<div>
		<el-table
			stripe
			flexible
			:header-cell-style="{ textAlign: 'center' }"
			:cell-style="{ textAlign: 'center' }"
			:border="true"
			:highlight-current-row="true"
			:data="tableData"
			style="width: 100%"
			empty-text="没有数据"
		>
			<el-table-column
				resizable
				fixed
				prop="name"
				label="名称"
			/>
			<el-table-column
				resizable
				prop="price"
				label="原价"
			/>
			<el-table-column
				resizable
				prop="nowPrice"
				label="现价"
			/>
			<el-table-column
				resizable
				prop="discount"
				label="折扣"
			/>
			<el-table-column
				resizable
				prop="soldout"
				label="售罄"
			>
				<template #default="{ row }">
					<span
						v-if="row.soldout == 1"
						style="color: var(--ep-color-danger); font-weight: bold;"
					>是</span>
					<span v-else>否</span>
				</template>
			</el-table-column>
			<el-table-column
				resizable
				prop="picurl"
				label="图片"
			>
				<template #default="{ row }">
					<el-image
						:src="row.picurl"
						@click="changePreviewList(row.picurl)"
						fit="cover"
						style="width: 50px; height: 100px"
						:preview-teleported="true"
						:hide-on-click-modal="true"
						:preview-src-list="previewList"
					>
						<template #error>
							<div
								class="error"
								style="height: 100%;width:100%;display: flex;align-items: center;justify-content: center;"
							>
								<el-icon><error-picture /></el-icon>
							</div>
						</template>
					</el-image>
				</template>

			</el-table-column>

			<el-table-column
				resizable
				prop="tips"
				label="标签"
			>
				<template #default="{ row }">
					<div style=" display: flex; flex-wrap: wrap; justify-content: space-evenly;">
						<el-tag
							v-for="tag in row.tips"
							type="warning"
						>{{ tag }}</el-tag>
					</div>

				</template>
			</el-table-column>

			<el-table-column
				resizable
				prop="series"
				label="系列"
				:formatter="showSeriesName"
			>

			</el-table-column>

			<el-table-column
				resizable
				prop="guid"
				fixed="right"
				label="管理"
			>
				<template #default="{ row }">
					<el-button
						@click="editItem(row.guid)"
						type="info"
						plain
						size="small"
						:icon="Edit"
						round
					>编辑</el-button>
					<el-button
						@click="deleteItem(row.guid)"
						type="danger"
						plain
						size="small"
						:icon="Delete"
						round
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import router from "~/router/index"
import { ElMessage } from 'element-plus';
import { Picture as errorPicture } from '@element-plus/icons-vue'

import { getMilkteaList, deletemilkteabyguid } from "~/axios/milktea"
import { getallseries } from "~/axios/series"
import { seriesT, dataListT } from "~/type/index"

const tableData = ref()
const previewList = ref()
const seriesList = ref([])

onBeforeMount( () => {
	initFunc()
}

)

// 执行初始化操作
async function initFunc() {
	await getMilkteaList().then(e => {
		if (!e.errorStatus) {
			tableData.value = e.dataList;
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})
	await getallseries().then(e => {
		if (!e.errorStatus) {
			seriesList.value = e.dataList;
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})
	makeDataShowBatter()
}

// 修改数据使其更适合展示
function makeDataShowBatter() {
	let tmp: any = []
	tableData.value.forEach((ele: any) => {
		ele.nowPrice = (ele.price * ele.discount).toFixed(2)
		tmp.push(ele)
	});
}

// 根据拿到的id显示对应series名称
function showSeriesName(e: dataListT) {
	let x = "未知数据"
	seriesList.value.forEach((elem: seriesT) => {
		if (elem!.value.toString() == e!.series) {
			x = elem!.label
		}
	});
	return x;
}

// 改变previewList的值,以达到预览图片是当前选择的目的
function changePreviewList(e: any) {
	let x = []
	x.push(e)
	previewList.value = x
}

// 删除列表里该项数据
function deleteItem(params: string) {
	deletemilkteabyguid(params).then(e => {
		if (!e.errorStatus) {
			initFunc()
			ElMessage.success("删除成功!")
		}
	}).catch(e => {
		ElMessage.error("网络错误!")
	})
}

// 编辑数据,跳转到对应的/modify/guid页面
function editItem(params: string) {
	router.push({ path: "/modify/" + params })
}

</script>

<style scoped lang="scss">
.tips_in_table {
	justify-content: space-evenly;
}
</style>