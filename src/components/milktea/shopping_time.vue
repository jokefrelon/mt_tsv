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

	<div
		class="page-main-od"
		@scroll="scr"
	>

		<div
			ref="m1ref"
			class="m1"
		>
			<el-menu
				default-active="0"
				class="cbl m1-1"
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
		</div>

		<div class="m2">
			<div
				class="m2-1"
				v-for="item in milkteaData"
			>

				<el-card
					class="m2-card"
					:body-style="{ padding: '0px', width: '100%' }"
				>

					<el-row :gutter="10">
						<div class="card_mask"
							v-show="item.soldout == 1"
						>	
						已售罄
						</div>
						<el-col
							:xs="8"
							:sm="6"
							:md="6"
							:lg="6"
							:xl="4"
						>
							<div class="card_image">
								<img
									:src="item.picurl"
									alt="奶茶图片"
								>
							</div>
						</el-col>
						<el-col
							:xs="8"
							:sm="14"
							:md="14"
							:lg="14"
							:xl="16"
						>
							<div class="card_main">
								<h3>{{ item.name }}</h3>
								<p>{{ item.intro }}</p>
								<p>{{ item.price }}</p>
								<p>{{ item.soldout }}</p>
							</div>
						</el-col>
						<el-col
							:xs="8"
							:sm="4"
							:md="4"
							:lg="4"
							:xl="4"
						>
							<div class="card_other">
								{{ item.name }}
							</div>
						</el-col>
					</el-row>




				</el-card>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { getOrderMilkteaList } from "~/axios/milktea"
import { getshopserieslist } from "~/axios/series"

let milkteaData: any = ref({})
let seriesData: any = ref({})

const m1ref = ref()

const m1_2_TopOriginal = ref(0)
const m1_px = ref()

function scr(e: any) {
	console.log(e.target.scrollTop);
}

onMounted(() => {
	m1_2_TopOriginal.value = m1ref.value.getBoundingClientRect().y
	m1_px.value = (m1_2_TopOriginal.value + 1) + "px"
})

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



.page-main-od {
	width: 100%;
	height: calc(100vh - v-bind(m1_px));
	overflow: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	scrollbar-width: none;
	font-size: var(--ep-font-size-base);

	.m1 {
		width: 30%;
		max-width: 200px;
		min-width: 80px;
		height: 100%;
		margin: 0;
		position: sticky;
		position: -webkit-sticky;
		top: 0px;

		.m1-1 {
			width: 100%;
			height: 100%;
		}

		.cbl {

			.cbl-it {
				margin: 3px 2px;
				border-radius: var(--ep-border-radius-round);
			}

			.cbl-it:hover {
				border-radius: var(--ep-border-radius-round);
			}

		}
	}

	.m2 {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		.m2-1 {
			width: 100%;
			height: fit-content;
			margin: 5px 5px;

			.m2-card {
				width: 100%;
				height: 150px;
				display: flex;
				z-index: 10;


				.card_mask {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					width: 100%;
					height: 150px;
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					background-color: rgba($color: #000000, $alpha: 0.1);
					z-index: 20;
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--ep-color-danger);
					font-weight: bold;
					font-family: var(--ep-font-family);
					font-size: var(--ep-font-size-base);
				}

				.card_image {
					user-select: none;

					img {
						object-fit: cover;
						height: 150px;
					}

				}

				.card_main {}

				.card_other {}
			}
		}
	}
}

.page-main-od::-webkit-scrollbar {
	display: none;
}
</style>