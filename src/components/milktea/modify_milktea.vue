<template>
	<div>
		<el-table stripe flexible :border="true" :highlight-current-row="true" :data="tableData" style="width: 100%">
			<el-table-column align="center" resizable fixed prop="name" label="名称" />
			<el-table-column align="center" resizable prop="price" label="原价" />
			<el-table-column align="center" resizable prop="nowPrice" label="现价" />
			<el-table-column align="center" resizable prop="discount" label="折扣" />
			<el-table-column align="center" resizable prop="soldout" label="售罄" />
			<el-table-column align="center" resizable prop="picurl" label="图片">
				<template #default="{ row }">
					<el-image :src="row.picurl" fit="cover" style="width: 50px; height: 100px" :preview-teleported="true"
						:hide-on-click-modal="true" />
				</template>

			</el-table-column>
			<el-table-column align="center" resizable prop="guid" fixed="right" label="管理">
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
import router  from "../../router/index"
import { useRoute } from 'vue-router'
import { getMilkteaList } from "../../axios/milktea/getmilktea"

const tableData = ref()

const route = useRoute()

console.log(route.params.guid);


onBeforeMount(() => {
	getMilkteaList().then((e) => {
		let result:any = null;
		if (e.errorStatus == false) {
			result = e.dataList;
		}		
		
		let tmp: { name: string; price: number; nowPrice: string; discount: number; soldout: string; picurl: string; }[] = []
		result.forEach((element: {
			guid: any,
			picurl: any;
			soldout: any;
			discount: any;
			price: any;
			name: any;
		}) => {
			let mp = {
				guid: "",
				name: "",
				price: 0,
				nowPrice: "",
				discount: 0,
				soldout: "",
				picurl: ""
			}
			mp.guid = element.guid
			mp.name = element.name
			mp.price = element.price
			mp.nowPrice = (element.price * element.discount).toFixed(2)
			mp.discount = element.discount
			mp.soldout = element.soldout == 1 ? "是" : "否"
			mp.picurl = element.picurl
			tmp.push(mp)
		});
		tableData.value = tmp

	})
})

function deleteItem(params: String) {
	console.log(params);
	router.push({ path: '/modify/123' })
	console.log(route.params.guid);
}

function editItem(params: String) {
	console.log(params);
}



const url = ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']
</script>

<style scoped>

</style>