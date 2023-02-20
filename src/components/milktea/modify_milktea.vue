<template>
	<div>
		<el-table stripe flexible :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }"
			:border="true" :highlight-current-row="true" :data="tableData" style="width: 100%">
			<el-table-column resizable fixed prop="name" label="名称" />
			<el-table-column resizable prop="price" label="原价" />
			<el-table-column resizable prop="nowPrice" label="现价" />
			<el-table-column resizable prop="discount" label="折扣" />
			<el-table-column resizable prop="soldout" label="售罄">
				<template #default="{ row }">
					<span v-if="row.soldout == 1" style="color: var(--ep-color-danger); font-weight: bold;" >是</span>
					<span v-else>否</span>
				</template>
			</el-table-column>
			<el-table-column resizable prop="picurl" label="图片">
				<template #default="{ row }">
					<el-image :src="row.picurl" @click="changePreviewList(row.picurl)" fit="cover"
						style="width: 50px; height: 100px" :preview-teleported="true" :hide-on-click-modal="true"
						:preview-src-list="previewList" />
				</template>
			</el-table-column>

			<el-table-column resizable prop="tips" label="标签">
				<template #default="{ row }">
					<div style=" display: flex; flex-wrap: wrap; justify-content: space-evenly;">
						<el-tag v-for="tag in row.tips" type="warning">{{ tag }}</el-tag>
					</div>

				</template>
			</el-table-column>

			<el-table-column resizable prop="series" label="系列">

			</el-table-column>

			<el-table-column resizable prop="guid" fixed="right" label="管理">
				<template #default="{ row }">
					<el-button @click="editItem(row.guid)" type="info" plain size="small" :icon="Edit" round>编辑</el-button>
					<el-button @click="deleteItem(row.guid)" type="danger" plain size="small" :icon="Delete" round>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import router from "~/router/index"
import { getMilkteaList } from "~/axios/milktea/getmilktea"
import { ElMessage } from 'element-plus';

const tableData = ref()
const previewList = ref()


onBeforeMount(
	async () => {
		await getMilkteaList().then(e => {
			if (!e.errorStatus) {
				tableData.value = e.dataList;
			}
		}).catch(() => {
			ElMessage.error("网络错误!")
		})
		initFunc()
	})

// 执行初始化操作
function initFunc() {
	makeDataShowBatter()
}

// 修改数据使其更适合展示
function makeDataShowBatter() {
	let tmp: any = []

	tableData.value.forEach((ele: any) => {
		ele.nowPrice = (ele.price * ele.discount).toFixed(2)
		tmp.push(ele)
	});
	console.log(tmp);
}

// 改变previewList的值,以达到预览图片是当前选择的目的
function changePreviewList(e: any) {
	let x = []
	x.push(e)
	previewList.value = x
}

function deleteItem(params: any) {
}

function editItem(params: any) {
	router.push({ path: "/modify/" + params })
	console.log(params);
}

</script>

<style scoped lang="scss">

.tips_in_table {
	justify-content: space-evenly;
}
</style>