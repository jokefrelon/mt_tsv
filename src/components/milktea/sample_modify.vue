<template>
	<div class="form">
		<el-form :model="form" :rules="formRules" ref="formRef">
			<el-form-item label="名称:" prop="name">
				<el-input v-model="form!.name" clearable placeholder="请输入奶茶名称" :prefix-icon="Document" />
			</el-form-item>

			<el-form-item label="价格:" prop="price">
				<el-input-number style="width: 100%;" :min="0" v-model="form!.price" clearable placeholder="请输入价格"
					:prefix-icon="Money" :precision="2" :step="10" />
			</el-form-item>

			<el-form-item label="介绍:" prop="intro">
				<el-input v-model="form!.intro" clearable placeholder="请输入奶茶简介" :prefix-icon="Comment" type="textarea" />
			</el-form-item>

			<el-form-item label="标签:" prop="tips">

				<el-tag v-for="tag in form!.tips" :key="tag" closable round hit @close="delTag(tag)">
					{{ tag }}
				</el-tag>
				<el-input v-if="tagInputVisible" ref="tagInputRef" v-model="tagValue" class="ml-1 w-20"
					@keyup.enter="copyTagValue2form_tips" @blur="copyTagValue2form_tips" />
				<el-button v-else @click="showInput" round>
					+新标签
				</el-button>

				<!-- <el-input v-model="form.tips" clearable placeholder="请输入奶茶标签" :prefix-icon="PriceTag" /> -->
			</el-form-item>

			<el-form-item label="系列:" prop="series">
				<el-select style="width: 100%;" v-model="form!.series" clearable placeholder="请选择奶茶所属系列" :suffix-icon="Flag"
					:fit-input-width=true>
					<el-option v-for="item in seriesData" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>

			<el-form-item label="售罄" prop="soldout">
				<el-radio-group v-model="form!.soldout">
					<el-radio :label=1>是</el-radio>
					<el-radio :label=0>否</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="折扣:" prop="discount">
				<el-row>
					<el-col :span="11">
						<el-input-number style="width: 100%;" :max="1" :min="0" v-model="form!.discount" clearable placeholder="请输入折扣"
							:prefix-icon="Money" :precision="2" :step="0.01" />
					</el-col>
					<el-col :span="2">
					</el-col>
					<el-col :span="11">
						<el-form-item label="现价">
							<el-input disabled v-model="nowPrice" />
						</el-form-item>
					</el-col>
				</el-row>


			</el-form-item>

			<el-form-item label="图片" prop="picurl">
				<el-input v-model="form!.picurl" disabled />
			</el-form-item>

			<el-upload drag ref="picUploadRef" :action="uploadPictureUrl" method="post" list-type="picture" :limit="1"
				:auto-upload=true :on-exceed="replacePicture" :on-success="copyUrl2picurl" :on-error="notifyUploadPicError"
				:on-remove="clearpicurl" :file-list=defaultPicture>
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
			<el-button v-loading="loading" @click="submitForm(formRef)" size="large" plain type="info"
				:icon="Sell">提交</el-button>
			<el-button @click="resetForm(formRef)" size="large" plain type="danger" :icon="Refresh">清除</el-button>
		</el-row>

	</div>
</template>

<script setup lang="ts">
import { Sell, Refresh, Money, Document, Comment, Flag } from '@element-plus/icons-vue'
import { reactive, ref, nextTick } from 'vue';
import { genFileId, ElMessage, ElInput } from 'element-plus'
import type { FormInstance, FormRules, UploadProps, UploadRawFile, UploadInstance } from 'element-plus'
import { getbaseurl } from "~/axios/baseurl"
import { getMilkteaByGuid } from "~/axios/milktea/getmilktea"
import { getallseries } from "~/axios/series/getseries"
import { useRoute } from 'vue-router'
import type { formT, dataListT } from "~/type"
import { updateMilkteaByGuid } from "~/axios/milktea/updatemilktea"
import router from '~/router';

const route = useRoute()

const uploadPictureUrl: any = ref(getbaseurl() + "uploadpic")

const formRef = ref<FormInstance>()
const picUploadRef = ref<UploadInstance>()
const tagInputRef = ref<InstanceType<typeof ElInput>>()

const tagValue = ref('')
const tagInputVisible = ref(false)
const seriesData = ref()
const defaultPicture: any = ref()
const loading = ref(false)
const nowPrice = computed(() => {
	if (form !== undefined) {
		return (form.price * form.discount).toFixed(2)
	}
})

let originalData: formT = reactive({
	guid: "",
	name: "",
	price: 0,
	intro: "",
	picurl: "",
	tips: [],
	series: 0,
	soldout: 0,
	discount: 1
})

// 表单变量
let form: formT = reactive({
	guid: "",
	name: "",
	price: 0,
	intro: "",
	picurl: "",
	tips: [],
	series: 0,
	soldout: 0,
	discount: 1
})

// 变量赋值
const assignment = (e: formT, r: dataListT) => {
	if (e !== undefined && r !== undefined) {
		e.guid = r.guid
		e.name = r.name
		e.price = r.price
		e.intro = r.intro
		e.picurl = r.picurl
		e.series = parseInt(r.series)
		e.tips = r.tips
		e.discount = r.discount
		e.soldout = r.soldout
	}
}

// 执行初始化操作,获取必要数据
onBeforeMount(() => {

	// 根据guid获取奶茶详细信息
	getMilkteaByGuid(route.params.guid).then(result => {
		if (!result.errorStatus && form !== undefined) {
			assignment(form, result.dataList[0])
			assignment(originalData, result.dataList[0])
			defaultPicture.value = [{ "name": form.picurl.split("/")[4], "url": form.picurl }]
		}
	}).catch(e => {
		ElMessage.error("网络错误!")
	})

	// 获取所有系列的数据
	getallseries().then(result => {
		if (result.errorStatus == false) {
			seriesData.value = result.dataList
		}
	}).catch(error => {
		console.log(error);
		ElMessage.error("网络错误!")
	})
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
	],
	soldout: [
		{ required: true, message: "必须的", trigger: "blur" }
	],
	discount: [
		{ required: true, message: "必须的", trigger: "blur" }
	]
})

// tag显示输入框
const showInput = () => {
	tagInputVisible.value = true
	nextTick(() => {
		tagInputRef.value!.input!.focus()
	})
}

// 保存tagValue的值到form.tips里面
const copyTagValue2form_tips = () => {
	if (tagValue.value) {
		form!.tips.push(tagValue.value)
	}
	tagInputVisible.value = false
	tagValue.value = ''
}

// 删除tag
const delTag = (tag: string) => {
	form!.tips.splice(form!.tips.indexOf(tag), 1)
}

// 替换选择的图片
const replacePicture: UploadProps['onExceed'] = files => {
	picUploadRef.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	picUploadRef.value!.handleStart(file)
}

// 上传图片成功后对picurl赋值
const copyUrl2picurl: UploadProps['onSuccess'] = result => {
	if (result.result == "200 ok") {
		form!.picurl = result.url
		ElMessage({
			message: '上传图片成功',
			type: 'success',
		})
	}
}

// 上传图片失败通知
const notifyUploadPicError: UploadProps['onError'] = e => {
	ElMessage.error("抱歉!图片上传失败")
}

// 删除图片同时删除picurl的值
const clearpicurl: UploadProps['onRemove'] = e => {
	console.log(e);
	form!.picurl = ""
}

// 重置表格
const resetForm = (formEl: FormInstance | undefined) => {
	picUploadRef.value?.clearFiles()
	if (!formEl) return
	formEl.resetFields()
}

// 比较数据是否相等
function isEqual(e1: formT, e2: formT) {
	if (e1 !== undefined && e2 !== undefined) {
		if (e1.name != e2.name) return false;
		if (e1.intro != e2.intro) return false;
		if (e1.picurl != e2.picurl) return false;
		if (e1.price != e2.price) return false;
		if (e1.series != e2.series) return false;
		if (JSON.stringify(e1.tips) != JSON.stringify(e2.tips)) return false;
		if (e1.discount != e2.discount) return false;
		if (e1.soldout != e2.soldout) return false;
		return true
	}
}

// 提交
const submitForm = (formEl: FormInstance | undefined) => {
	loading.value = true
	if (!formEl) return
	formEl.validate((valid) => {
		if (valid) {
			if (isEqual(form, originalData)) {
				ElMessage.info("数据未修改不需要提交!请直接返回!")
				loading.value = false
				return 0
			}

			updateMilkteaByGuid(form).then(e => {
				if (!e.errorStatus) {
					ElMessage.success("提交成功!")
					loading.value = false
					router.push({ path: "/modify" })
				}
			}).catch(e => {
				ElMessage.error("提交失败!")
			})
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