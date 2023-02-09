<template>
	<div class="form">
		<el-form :model="form">

			<el-form-item label="名称:">
				<el-input v-model="form.name" />
			</el-form-item>

			<el-form-item label="价格:">
				<el-input v-model="form.price" />
			</el-form-item>

			<el-form-item label="介绍:">
				<el-input v-model="form.intro" />
			</el-form-item>

			<el-form-item label="标签:">
				<el-input v-model="form.tips" />
			</el-form-item>

			<el-form-item label="系列:">
				<el-input v-model="form.series" />
			</el-form-item>

			<el-form-item label="图片" v-show="false">
				<el-input v-model="form.picurl" disabled />
			</el-form-item>

			<el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<p class="el-upload__text">
					拖拽图片至此上传<br>
					<span class="el-upload__tip" style="font-size: 13px;color: #888888a8;">
						<b>JPEG/PNG</b>并小于<b>500kb</b>
					</span>
				</p>
			</el-upload>
		</el-form>
		<el-row justify="space-evenly">
			<el-button size="large" plain type="info" :icon="Sell">提交</el-button>
			<el-button size="large" plain type="danger" :icon="Refresh">清除</el-button>
		</el-row>

	</div>
</template>

<script setup lang="ts">
import {Sell,Refresh} from '@element-plus/icons-vue'

import { ref, reactive } from 'vue';

let form: any = ref({
	name: "",
	price: "",
	intro: "",
	picurl: "",
	tips: "",
	series: "",

})

</script>

<style scoped>
.form {
	margin: 0 auto;
	width: 60%;
	height: 100%;
}
</style>