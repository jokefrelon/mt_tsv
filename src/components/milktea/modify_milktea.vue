<template>
	<div>
		<el-table stripe flexible :border="true" :highlight-current-row="true" :data="tableData" style="width: 100%">
			<el-table-column align="center" resizable fixed prop="date" label="名称" />
			<el-table-column align="center" resizable prop="name" label="原价" />
			<el-table-column align="center" resizable prop="state" label="现价" />
			<el-table-column align="center" resizable prop="city" label="折扣" />
			<el-table-column align="center" resizable prop="address" label="售罄" />
			<el-table-column align="center" resizable prop="zip" label="图片">
				<el-image :src="url[0]" fit="cover" style="width: 100px; height: 100px" :preview-src-list="url"
					:preview-teleported="true" :hide-on-click-modal="true" />
			</el-table-column>
			<el-table-column align="center" resizable fixed="right" label="管理">
				<template #default>
					<el-button type="info" plain size="small" :icon="Edit" round>编辑</el-button>
					<el-button type="danger" plain size="small" :icon="Delete" round>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'

const url = ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']

const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: '',
		zip: 'CA 90036',
		tag: 'Home',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Office',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Home',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Office',
	},
]
</script>

<style scoped>

</style>