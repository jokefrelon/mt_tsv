<template>
	<el-config-provider namespace="ep">
		<div>
			<el-container>
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
import nstore from "./store/index"

const n_store = nstore()

</script>

<style>
#app {
	text-align: center;
	color: var(--ep-text-color-primary);
}
</style>
