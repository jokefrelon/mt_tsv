<template>
	<el-carousel
		height="70px"
		:interval="3000"
	>
		<el-carousel-item v-for="item in items">
			<div class="item-container">
				<div class="left-image">
					<img
						:src="item.imageUrl"
						alt=""
					>
				</div>
				<div class="right-text">
					<h3>{{ item.title }}</h3>
					<p class="desc">{{ item.description }}</p>
					<p class="rmb">{{ item.price }}</p>
				</div>
			</div>
		</el-carousel-item>
	</el-carousel>

	<el-row>
		<el-col
			:xs="8"
			:sm="4"
			:md="4"
			:lg="3"
		>
			<el-menu
				default-active="0"
				class="cbl"
			>
				<el-menu-item
					v-for="(item, index) in seriesData"
					:key="item"
					:index=index.toString()
					class="cbl-it"
				>

					<span style="width: 100%;display: flex;align-items: center;justify-content: center;flex-wrap: wrap;">
						{{ item.name }}
					</span>
				</el-menu-item>


			</el-menu>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { getOrderMilkteaList } from "~/axios/milktea"
import { getshopserieslist } from "~/axios/series"

let milkteaData: any = ref({})
let seriesData: any = ref({})

type x = {
	imageUrl: string
	title: string
	description: string
	price: string
}
const items: x[] = reactive([
	{
		imageUrl: "http://pics.ip.jokeme.top:6280/2023-02-20/p94n-9gtr-no7x-lcr4.png",
		title: "h的法国",
		description: "nihaoya c速度和覅u和爱看i实力和放大",
		price: "34.98"
	},
	{
		imageUrl: "http://pics.ip.jokeme.top:6280/2023-02-20/p94n-9gtr-no7x-lcr4.png",
		title: "啊o阿斯顿",
		description: "士大夫士大夫皇家空军哈师大卡拉实践活动来看",
		price: "34.98"
	},
	{
		imageUrl: "http://pics.ip.jokeme.top:6280/2023-02-20/p94n-9gtr-no7x-lcr4.png",
		title: "速度丁给",
		description: "自动发给你S离开家跨世纪的政治上的控制世界的官方 c",
		price: "34.98"
	}
])

const initfunc = () => {
	getOrderMilkteaList().then(e => {
		if (!e.errorStatus) {
			milkteaData.value = e.dataList
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})
	getshopserieslist().then(e => {
		if (!e.errorStatus) {
			seriesData.value = e.dataList
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})
}

onBeforeMount(() => {
	initfunc()
})

</script>


<style lang="scss" scoped>
:root {
	.ep-menu-item.is-active span {
		color: var(--ep-color-danger-dark-2);
	}

	.ep-menu-item.is-active {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background-color: var(--ep-fill-color);
		border-radius: var(--ep-border-radius-round);
	}

}

.item-container {

	--mel-carousel-height: 70px;

	display: flex;
	align-items: center;
	height: var(--mel-carousel-height);
	background-color: var(--ep-fill-color-dark);
	user-select: none;

	.left-image {
		height: var(--mel-carousel-height);
		width: 30%;
		display: flex;
		justify-content: flex-end;

		img {
			width: auto;
			height: 70px;
			object-fit: contain;
			position: relative;
			z-index: 2;
			transform: scale(1);
			transition: transform 0.5s ease 0s;
		}

		img:hover {
			transform: scale(1.5);
		}
	}

	.ep-carousel__button {
		background-color: var(--ep-text-color-regular);
	}

	.right-text {
		height: var(--mel-carousel-height);
		width: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;

		h3 {
			padding: 0;
			margin: 0;
			color: var(--ep-text-color-primary);
			font-family: var(--ep-font-family);
			font-weight: bolder;

		}

		p {
			padding: 0;
			margin: 0;
		}

		.desc {
			color: var(--ep-text-color-secondary);
			font-size: var(--ep-font-size-extra-small);
		}

		.rmb {
			font-size: var(--ep-font-size-base);
			font-weight: bolder;
			font-style: italic;
			color: var(--ep-color-danger-dark-2);
		}

		.rmb::after {
			content: " ¥";
		}
	}
}

.cbl {

	.cbl-it {
		margin: 3px 2px;
		border-radius: var(--ep-border-radius-round);
	}
	.cbl-it:hover{
		border-radius: var(--ep-border-radius-round);
	}

}
</style>