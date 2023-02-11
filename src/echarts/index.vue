<template>
	<div class="echarts" ref="echarts_virtual_DOM">
	</div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import {onMounted, shallowRef, watch } from "vue";
// 使用shallowRef参考 Github:[pissang](https://github.com/apache/echarts/issues/13943#issuecomment-755301987)
let echarts_virtual_DOM:any = shallowRef(null)
let newEcharts:any = shallowRef(null)
const  props = defineProps({
  options:{
      type:Object,
      default:{},
      required:true
  },
})
const resizeHandler = () => {
  newEcharts.value.resize()
}
onMounted(() => {
  newEcharts.value = echarts.init(echarts_virtual_DOM.value)
  newEcharts.value.setOption(props.options, true)
  window.addEventListener('resize', resizeHandler)
})
watch(() => props.options, (newOptions) => {
  newEcharts.value.setOption(newOptions)
},{
  deep: true
})
</script>

<style scoped>
.echarts{
	width: 100%;
	height: 67vh;
	align-items: center;
	justify-content: center;
}
/* 无法动态resize无效,解决方案参考 掘金:[A吴迪网络工作室](https://juejin.cn/post/6976082598086836261) */
</style>

<!-- 本文参考 知乎:[风口上的交易狗](https://zhuanlan.zhihu.com/p/519021789) -->