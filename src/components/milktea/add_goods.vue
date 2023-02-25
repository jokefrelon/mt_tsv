<template>
	<div class="form">
		<el-form
			:model="form"
			:rules="formRules"
			ref="formRef"
		>
			<el-form-item
				label="名称:"
				prop="name"
			>
				<el-input
					v-model="form.name"
					clearable
					placeholder="请输入奶茶名称"
					:prefix-icon="Document"
				/>
			</el-form-item>

			<el-form-item
				label="价格:"
				prop="price"
			>
				<el-input-number
					style="width: 100%;"
					:min="0"
					v-model="form.price"
					clearable
					placeholder="请输入价格"
					:prefix-icon="Money"
					:precision="2"
					:step="0.01"
				/>
			</el-form-item>

			<el-form-item
				label="介绍:"
				prop="intro"
			>
				<el-input
					v-model="form.intro"
					clearable
					placeholder="请输入奶茶简介"
					:prefix-icon="Comment"
				/>
			</el-form-item>

			<el-form-item
				label="标签:"
				prop="tips"
			>

				<el-tag
					v-for="tag in form.tips"
					:key="tag"
					closable
					round
					hit
					@close="delTag(tag)"
				>
					{{ tag }}
				</el-tag>
				<el-input
					v-if="tagInputVisible"
					ref="tagInputRef"
					v-model="tagValue"
					class="ml-1 w-20"
					@keyup.enter="copyTagValue2form_tips"
					@blur="copyTagValue2form_tips"
				/>
				<el-button
					v-else
					@click="showInput"
					round
				>
					+新标签
				</el-button>

				<!-- <el-input v-model="form.tips" clearable placeholder="请输入奶茶标签" :prefix-icon="PriceTag" /> -->
			</el-form-item>

			<el-form-item
				label="系列:"
				prop="series"
			>
				<el-select
					style="width: 100%;"
					v-model="form.series"
					clearable
					placeholder="请选择奶茶所属系列"
					:suffix-icon="Flag"
					:fit-input-width=true
				>
					<el-option
						v-for="item in seriesData"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>

			<el-form-item
				label="图片"
				prop="picurl"
			>
				<el-input
					v-model="form.picurl"
					disabled
				/>
			</el-form-item>

			<el-upload
				drag
				ref="picUploadRef"
				:action="uploadPictureUrl"
				method="post"
				list-type="picture"
				:limit="1"
				:auto-upload=true
				:on-exceed="replacePicture"
				:on-success="copyUrl2picurl"
				:on-error="notifyUploadPicError"
			>
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
			<el-button
				@click="submitForm(formRef)"
				size="large"
				plain
				type="info"
				:icon="Sell"
			>提交</el-button>
			<el-button
				@click="resetForm(formRef)"
				size="large"
				plain
				type="danger"
				:icon="Refresh"
			>清除</el-button>
		</el-row>

	</div>
</template>

<script setup lang="ts">
import { Sell, Refresh, Money, Document, Comment, Flag } from '@element-plus/icons-vue'
import { reactive, ref, nextTick } from 'vue';
import { genFileId, ElMessage, ElInput } from 'element-plus'
import type { FormInstance, FormRules, UploadProps, UploadRawFile, UploadInstance } from 'element-plus'

import { axmtpost } from "~/axios/milktea/index";
import { getallseries } from "~/axios/series"
import { getbaseurl } from "~/axios/baseurl"

const uploadPictureUrl: any = ref(getbaseurl() + "uploadpic")
const seriesData: any = ref()
const formRef = ref<FormInstance>()
const picUploadRef = ref<UploadInstance>()
const tagInputRef = ref<InstanceType<typeof ElInput>>()

const tagValue = ref('')
const tagInputVisible = ref(false)

onBeforeMount(() => {
	getallseries().then(result => {
		if (result.errorStatus == false) {
			seriesData.value = result.dataList
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})
})

// 定义类型
type formT = {
	name: string;
	price: number | undefined;
	intro: string;
	picurl: string;
	tips: string[];
	series: number | undefined;
}

// 表单变量
let form: formT = reactive({
	name: "",
	price: undefined,
	intro: "",
	picurl: "",
	tips: [],
	series: undefined,
})

// 表单校验规则
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

// 显示输入框
const showInput = () => {
	tagInputVisible.value = true
	nextTick(() => {
		tagInputRef.value!.input!.focus()
	})
}

// 保存tagValue的值到form.tips里面
const copyTagValue2form_tips = () => {
	if (tagValue.value) {
		form.tips.push(tagValue.value)
	}
	tagInputVisible.value = false
	tagValue.value = ''
}

// 删除tag
const delTag = (tag: string) => {
	form.tips.splice(form.tips.indexOf(tag), 1)
}

// 替换选择的图片
const replacePicture: UploadProps['onExceed'] = (files) => {
	picUploadRef.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	picUploadRef.value!.handleStart(file)
}

// 上传图片成功后对picurl赋值
const copyUrl2picurl: UploadProps['onSuccess'] = (result) => {
	if (result.result == "200 ok") {
		form.picurl = result.url
		ElMessage({
			message: '上传图片成功',
			type: 'success',
		})
	}
}

// 上传图片失败通知
const notifyUploadPicError: UploadProps['onError'] = (e) => {
	ElMessage.error("抱歉!图片上传失败")
}

// 重置表格
const resetForm = (formEl: FormInstance | undefined) => {
	picUploadRef.value?.clearFiles()
	if (!formEl) return
	formEl.resetFields()
}

// 提交
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid) => {
		if (valid) {
			axmtpost(form).then(result => {
				if (result.errorStatus == false) {
					resetForm(formRef.value)
					ElMessage({
						message: '提交成功!',
						type: 'success',
					})
				}
			})
		} else {
			ElMessage.error("提交失败!")
			return false
		}
	})
}

</script>

<style scoped lang="scss">
.form {
	margin: 0 auto;
	width: 60%;
	height: 100%;
}
</style>