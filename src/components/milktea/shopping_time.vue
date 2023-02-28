<template>
	<el-carousel
		height="70px"
		:interval="3000"
		style="border-radius: var(--ep-border-radius-base);"
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
		@scroll="scrollFunc"
		ref="odref"
	>

		<div
			class="m1"
			ref="m1ref"
		>
			<el-menu
				:default-active="active_menu_index"
				class="cbl m1-1"
			>
				<el-menu-item
					v-for="(item, index) in seriesData"
					:key="item"
					:index=index.toString()
					class="cbl-it"
					@click="scrollItemTo(index)"
				>
					<span style="width: 100%;display: flex;align-items: center;justify-content: center;flex-wrap: wrap;">
						{{ item.name }}
					</span>
				</el-menu-item>
			</el-menu>
			<div class="settlement">
				<el-row>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="12"
						:xl="12"
					>
						<div class="money">
							总价:<span>{{ money }}</span>
						</div>
					</el-col>
					<el-col
						:xs="24"
						:sm="24"
						:md="12"
						:lg="12"
						:xl="12"
					>
						<div class="text">
							<div class="bt">
								<i class="bi bi-cash">结算</i>
							</div>

						</div>
					</el-col>
				</el-row>


			</div>

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
						<div
							class="card_mask"
							v-show="item.soldout == 1"
						>
						</div>
						<el-col
							:xs="6"
							:sm="6"
							:md="4"
							:lg="4"
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
							:xs="14"
							:sm="14"
							:md="16"
							:lg="16"
							:xl="16"
						>
							<div class="card_main">
								<h3 class="name">{{ item.name }}</h3>
								<p class="intro">{{ item.intro }}</p>

								<p class="tag">
									<el-tag
										class="tag_detail"
										v-for="it in item.tips"
										type="warning"
										size="small"
									>{{ it }}
									</el-tag>
								</p>

								<p
									class="price"
									v-if="item.discount != 1"
								>
									<del
										class="sp"
										style="color: var(--ep-text-color-secondary);"
									> {{ item.price }} ¥ </del>
									<span
										class="sp"
										style="color: var(--ep-text-color-secondary);"
									> -></span>
									<span class="sp nowp">{{ (item.price * item.discount).toFixed(2) }}</span>
									<span
										class="sp"
										style="color: var(--ep-text-color-secondary);font-style: normal;font-size: var(--ep-font-size-extra-small);"
									>({{ item.discount }}折)</span>
								</p>
								<p
									class="price"
									v-else
								>
									<span class="sp nowp">{{ (item.price * item.discount).toFixed(2) }}</span>
								</p>
							</div>
						</el-col>
						<el-col
							:xs="4"
							:sm="4"
							:md="4"
							:lg="4"
							:xl="4"
						>
							<div class="card_other">
								<div class="add2car">

									<i
										class="bi bi-cart3"
										v-show="!item.status"
										@click="add2car(item)"
									></i>

									<i
										class="bi bi-cart-check"
										v-show="item.status"
										@click="removeFromCar(item)"
									></i>
								</div>
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

let seriesScrollDistance: any = ref([0])
let money = ref(0)

const m1ref = ref()
const odref = ref()

const m1_2_TopOriginal = ref(0)
const m1_px = ref()

const active_menu_index = ref("0")

const initfunc = async () => {
	// 获取milkteaData数据
	await getOrderMilkteaList().then(e => {
		if (!e.errorStatus) {
			milkteaData.value = e.dataList
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})
	// 获取seriesData数据
	await getshopserieslist().then(e => {
		if (!e.errorStatus) {
			seriesData.value = e.dataList
		}
	}).catch(() => {
		ElMessage.error("网络错误!")
	})

	// 计算滚动距离
	function caleDistance() {
		for (let index = 0; index < seriesData.value.length; index++) {
			const ele = seriesData.value[index];
			seriesScrollDistance.value.push((ele.number * 162) + seriesScrollDistance.value[seriesScrollDistance.value.length - 1])
		}
	}

	caleDistance()

}


onBeforeMount(() => {
	initfunc()
})

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

function scrollItemTo(params: number) {
	odref.value.scrollTo({ top: seriesScrollDistance.value[params],scrollListener: false })
}

// 监听滚动距离
function scrollFunc(e: any) {
	for (let index = 0; index < seriesScrollDistance.value.length - 1; index++) {
		const element = seriesScrollDistance.value;
		if (element[index] < e.target.scrollTop && e.target.scrollTop < element[index + 1]) {
			setTimeout(() => {
				active_menu_index.value = index.toString()
			}, 100);
		}
	}

}

// 添加到购物车操作
const add2car = (e: any) => {
	e.status = true
	ElMessage.info("已加入购物车!")
}

// 从购物车移除操作
const removeFromCar = (e: any) => {
	e.status = null
	ElMessage.warning("已移除购物车!")
}

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
	position: relative;

	.settlement {
		position: sticky;
		position: -webkit-sticky;
		bottom: 5px;
		height: fit-content;
		background-color: var(--ep-bg-color-overlay);
		backdrop-filter: blur(20px);
		border-radius: var(--ep-border-radius-base);
		border: 1px solid var(--ep-border-color);
		margin-right: 5px;
		padding: 10px 2px 10px 2px;

		.money {
			width: 100%;
			height: 30px;
			line-height: 30px;
			font-size: var(--ep-font-size-base);

			span {
				font-weight: bold;
				color: var(--ep-color-danger-light-3);
				font-family: var(--ep-font-family);

			}
		}

		.money::after {
			content: "¥";
		}

		.text {
			width: 100%;
			height: 30px;
			line-height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;

			.bt {
				width: 70%;
				height: fit-content;
				background-color: var(--ep-color-danger-light-9);
				border: 1px solid var(--ep-color-danger-light-5);
				color: var(--ep-color-danger-dark-2);
				border-radius: var(--ep-border-radius-round);

				.bi-cash {
					font-size: var(--ep-font-size-base);
					font-style: normal;
					font-weight: bold;
					cursor: pointer;
				}
			}

			.bt:hover {
				color: var(--ep-color-white);
				background-color: var(--ep-color-danger);
				border: 1px solid var(--ep-color-danger);
			}
		}
	}

	.m1 {
		width: 30%;
		max-width: 200px;
		min-width: 120px;
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
					bottom: 0;
					width: 100%;
					height: 150px;
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					background-color: rgba($color: #000000, $alpha: 0.1);
					z-index: 20;
					display: flex;
					align-items: center;
					justify-content: center;
					color: var(--ep-text-color-secondary);
					font-weight: bold;
					font-family: var(--ep-font-family);
					font-size: var(--ep-font-size-base);
				}

				.card_mask::after {
					content: "已售罄!";
				}

				.card_image {
					user-select: none;

					img {
						object-fit: cover;
						height: 150px;
					}

				}

				.card_main {
					height: 100%;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;

					.name {
						width: auto;
						height: auto;
						font-size: var(--ep-font-size-extra-large);
						margin: 5px 0 0 0;
					}

					.intro {
						color: var(--ep-text-color-secondary);
						font-size: var(--ep-font-size-extra-small);
						margin: 5px 0 0 0;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-wrap: wrap;
					}

					.price {
						width: 100%;
						margin: 5px 0 0 0;
						color: var(--ep-color-danger-dark-2);
						font-weight: bold;
						font-style: italic;

						.sp {
							margin: 0 1px;
						}

						.nowp::after {
							content: "¥";
						}
					}

					.tag {
						width: 100%;
						margin: 5px 0 0 0;

						.tag_detail {
							margin: 0px 2px;
						}
					}


				}

				.card_other {
					width: 100%;
					height: 100%;

					.add2car {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;

						.bi-cart3 {
							font-size: 30px;
							color: var(--ep-color-danger-dark-2)
						}

						.bi-cart3:hover {
							cursor: pointer;
						}

						.bi-cart-check {
							font-size: 30px;
							color: var(--ep-color-success-dark-2)
						}

						.bi-cart-check:hover {
							cursor: pointer;
						}
					}

				}
			}
		}
	}
}

.page-main-od::-webkit-scrollbar {
	display: none;
}
</style>