<template>
	<div class="form">
		<el-form :model="form" :rules="formRules" ref="formRef">
			<el-form-item label="名称:" prop="name">
				<el-input v-model="form.name" clearable placeholder="请输入奶茶名称" :prefix-icon="Document" />
			</el-form-item>

			<el-form-item label="价格:" prop="price">
				<el-input-number style="width: 100%;" :min="0" v-model="form.price" clearable placeholder="请输入价格"
					:prefix-icon="Money" :precision="2" :step="0.01" />
			</el-form-item>

			<el-form-item label="介绍:" prop="intro">
				<el-input v-model="form.intro" clearable placeholder="请输入奶茶简介" :prefix-icon="Comment" />
			</el-form-item>

			<el-form-item label="标签:" prop="tips">
				<el-input v-model="form.tips" clearable placeholder="请输入奶茶标签" :prefix-icon="PriceTag" />
			</el-form-item>

			<el-form-item label="系列:" prop="series">
				<el-select style="width: 100%;" v-model="form.series" clearable placeholder="请选择奶茶所属系列" :suffix-icon="Flag"
					:fit-input-width=true>
					<el-option v-for="item in test" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>

			<el-form-item label="图片" prop="picurl">
				<el-input v-model="form.picurl" disabled />
			</el-form-item>

			<el-upload drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
				<el-icon><upload-filled /></el-icon>
				<p>
					拖拽图片至此上传
					<br>
					<span style="font-size: 13px;color: #888888a8;">
						<b>JPEG/PNG</b>并小于<b>500kb</b>
					</span>
				</p>
			</el-upload>
		</el-form>
		<el-row justify="space-evenly">
			<el-button size="large" plain type="info" :icon="Sell">提交</el-button>
			<el-button @click="resetForm(formRef)" size="large" plain type="danger" :icon="Refresh">清除</el-button>
		</el-row>

	</div>
</template>

<script setup lang="ts">
import { Sell, Refresh, Money, PriceTag, Document, Comment, Flag } from '@element-plus/icons-vue'
import { reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import axmtpost from "../../axios/milktea/addmilktea";

const formRef = ref<FormInstance>()

let form: any = reactive({
	name: "",
	price: null,
	intro: "",
	picurl: "",
	tips: "",
	series: "",
})

const formRules = reactive<FormRules>({
	name: [
		{ required: true, message: "名称是必须的", trigger: "blur" }
	],
	price: [
		{ required: true, message: "价钱是必须的", trigger: "blur" }
	],
	intro: [
		{ required: true, message: "简介是必须的", trigger: "blur" }
	],
	tips: [
		{ required: true, message: "标签是必须的", trigger: "blur" }
	],
	picurl: [
		{ required: true, message: "图片是必须的", trigger: "blur" }
	],
	series: [
		{ required: true, message: "系列是必须的", trigger: "blur" }
	]
})

let test = reactive(
	[
		{ value: "1", label: "test1" },
		{ value: "2", label: "test2" }
	]
)
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
	console.log(form);
	
}

</script>

<style scoped lang="scss">
.form {
	margin: 0 auto;
	width: 60%;
	height: 100%;
}
</style>