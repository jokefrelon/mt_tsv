<template>
	<div class="ptab">
		<myecharts :options="options_1"></myecharts>
		<myecharts :options="options_2"></myecharts>
		<myecharts :options="options_3"></myecharts>
	</div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import myecharts from "../echarts/index.vue";
import * as echarts from 'echarts';



let options_1: any = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		}
	},
	legend: {
		textStyle: {
			color: "#888"
		}
	},
	toolbox: {
		feature: {
			saveAsImage: {
				title: "保存图片",
				type: "png"
			}
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [
		{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}
	],
	yAxis: [
		{
			type: 'value'
		}
	],
	series: [
		{
			name: '杨枝甘露',
			type: 'line',
			data: [120, 132, 161, 134, 190, 230, 150]
		},
		{
			name: '芋泥啵啵',
			type: 'line',
			data: [220, 182, 191, 234, 208, 183, 207]
		},
		{
			name: '爽口香蕉',
			type: 'line',
			data: [150, 232, 201, 154, 190, 189, 110]
		},
		{
			name: '菠萝吹雪',
			type: 'line',
			data: [220, 132, 161, 134, 128, 139, 186]
		},
		{
			name: '草莓桃子🍑',
			type: 'line',
			data: [120, 132, 201, 134, 154, 220, 187]
		}
	]
})

let options_2: any = ref({
	tooltip: {
		trigger: 'item'
	},
	legend: {
		top: '5%',
		left: 'center',
		textStyle: {
			color: "#888"
		}
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 10,
				borderColor: '#fff',
				borderWidth: 2
			},
			label: {
				show: false,
				position: 'center'
			},
			emphasis: {
				label: {
					show: true,
					fontSize: 40,
					fontWeight: 'bold'
				}
			},
			labelLine: {
				show: false
			},
			data: [
				{ value: 1048, name: '杨枝甘露' },
				{ value: 735, name: '芋泥啵啵' },
				{ value: 580, name: '爽口香蕉' },
				{ value: 484, name: '菠萝吹雪' },
				{ value: 300, name: '草莓桃子🍑' }
			]
		}
	]
})

let options_3: any = ref({
	toolbox: {
		feature: {
			saveAsImage: {
				title: "保存图片",
				type: "png"
			}
		}
	},
	visualMap: {
		show: true,
		min: 0,
		max: 500,
		left: 0,
		top: 60,
		inRange: {
			color: ["#eee", "#6f6", "#090", "#040"]
		}
	},
	calendar: {
		range: '2023',
		cellSize: 23,
		splitLine: {
			show: false
		},

		itemStyle: {
			borderWidth: 5,
			borderRadius: 5,
			color: 'rgba(0,0,0,0)',
			borderColor: 'rgba(0,0,0,0)',
		},
		dayLabel: {
			nameMap: "ZH",
			color: "#888"
		},
		monthLabel: {
			nameMap: "ZH",
			color: "#888"
		},
		yearLabel: {
			align: "center",
			color: "#888"
		}
	},
	tooltip: {
		textStyle: {
			color: "#000000",
		},
		formatter: function (p: any) {
			const format = echarts.time.format(p.data[0], '{MM}/{dd}', false);
			return format + ' : <b style="color:#ee964b">' + p.data[1] + "¥</b>";
		},
		trigger: "item"
	},
	series: {
		type: 'heatmap',
		itemStyle: {
			borderRadius: 5,
		},
		coordinateSystem: 'calendar',
		data: [
			['2023-01-01', "100"],
			['2023-01-02', "0"],
			['2023-01-04', "500"],
			['2023-01-12', "450"],
			['2023-01-21', "400"],
			['2023-01-22', "350"],
			['2023-01-13', "300"],
			['2023-01-31', "250"],
			['2023-09-02', "200"],
			['2023-12-13', "150"],
			['2023-11-21', "50"],
			['2023-07-02', "1296"],
			['2023-08-31', "416"],
			['2023-12-18', "129"],
			['2023-10-15', "196"],
			['2023-09-23', "216"],
		]
	}
})

</script>

<style scoped>
.ptab {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
</style>