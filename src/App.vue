<template>
	<el-config-provider namespace="ep" :locale="locale">
		<div class="se">
			<el-container style="height: 100%;">
				<el-header style="padding: 0;">
					<BaseHeader />
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</div>
	</el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
let locale = zhCn
</script>

<style>
#app {
	text-align: center;
	color: var(--ep-text-color-primary);
	height: 100%;
}

.se{
	height: 100%;
}
</style>
