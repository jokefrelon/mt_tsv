<template>
	<el-row justify="space-evenly">
		<el-form
			:model="seriesName"
			:rules="formRules"
			ref="formRef"
		>
			<el-form-item
				prop="name"
				label="系列名称"
				style="width: 100%;"
			>
				<el-input
					v-model="seriesName.name"
					style="width: 100%;"
					clearable
					@keyup.enter="submitSeriesName(formRef)"
				/>
			</el-form-item>
		</el-form>
	</el-row>

	<el-row
		justify="space-evenly"
		style="padding-bottom: 5px"
	>
		<el-button
			@click="submitSeriesName(formRef)"
			size="large"
			plain
			type="info"
			:icon="Check"
		>
			提交
		</el-button>
	</el-row>



	<el-row justify="space-evenly">
		<el-form :model="selectSeries">
			<el-form-item>
				<el-select
					v-model="selectSeries.select"
					clearable
					placeholder="请选择"
				>
					<el-option
						v-for="item in seriesData"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
		</el-form>
	</el-row>

	<el-row
		justify="space-evenly"
		style="padding-bottom;: 5px "
	>
		<el-button
			@click="delSelectSeries"
			size="large"
			plain
			type="danger"
			:icon="DeleteFilled"
		>
			删除
		</el-button>
	</el-row>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { Check, DeleteFilled } from '@element-plus/icons-vue'
import { addseries, getallseries, delseries } from "~/axios/series"

const formRef = ref<FormInstance>()
const seriesData: any = ref()



const seriesName = reactive({
	name: ""
})

const selectSeries = reactive({
	select: ""
})

onBeforeMount(() => {
	initFunc()
})

// 初始化数据
const initFunc = () => {
	getallseries().then(result => {
		if (result.errorStatus == false) {
			seriesData.value = result.dataList
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})
}

// 定义表单验证规则
const formRules = reactive<FormRules>({
	name: [
		{ required: true, message: "名称是必须的", trigger: "blur" }
	]
})

// 提交填写的series名称
const submitSeriesName = (seriesForm: FormInstance | undefined) => {
	if (!seriesForm) return
	seriesForm.validate(valid => {
		if (valid) {
			addseries(seriesName.name).then(e => {
				if (e) {
					ElMessage.success("保存成功!")
					seriesName.name = ""
					initFunc()
				} else {
					ElMessage.error("保存失败!")
				}
			})
		}
	})
}

// 删除选择的选项
const delSelectSeries = () => {
	if (selectSeries.select == "") {
		ElMessage.info("请先选择一个需要删除的项目!")
	} else {
		delseries(selectSeries.select).then(e => {
			if (e) {
				initFunc()
				selectSeries.select = ""
				ElMessage.success("删除成功!")
			}
		})
	}
}

</script>

<style lang="scss" scoped>
.series {
	height: 200px;
	padding: 5px 0;
	width: 80%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
}

.ep-row {
	margin: 5px 0px;
}

.ep-form-item {
	margin-bottom: 10px;
}
</style>