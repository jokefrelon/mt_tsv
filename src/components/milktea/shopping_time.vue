<template>
	<div class="shopping">
		<!-- 轮播图 -->
		<!-- <el-carousel
			height="70px"
			:interval="3000"
			style="border-radius: var(--ep-border-radius-base);"
		>
			<el-carousel-item v-for="item in CarouselData">
				<div class="item-container">
					<div class="left-image">
						<img
							:src="item!.imageUrl"
							alt=""
						>
					</div>
					<div class="right-text">
						<h3>{{ item!.title }}</h3>
						<p class="desc">{{ item!.description }}</p>
						<p class="rmb">{{ item!.price }}</p>
					</div>
				</div>
			</el-carousel-item>
		</el-carousel> -->

		<div
			class="page-main-od"
			@scroll="scrollFunc"
			ref="odref"
		>

			<!-- 侧边栏 -->
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
								<div
									class="bt"
									@click="showDialog"
								>
									<i class="bi bi-cash">结算</i>
								</div>
							</div>
						</el-col>
					</el-row>


				</div>

			</div>
			<!-- 奶茶选择页面 -->
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
								:xs="5"
								:sm="5"
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
								:xs="5"
								:sm="5"
								:md="4"
								:lg="4"
								:xl="4"
							>
								<div class="card_other">
									<div class="add2car">
										<div class="icon">
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

										<div
											class="number"
											v-show="item.status"
										>
											<el-slider
												@change="sliderValueChange(item, $event)"
												v-model="carData[item.guid]"
												:min="0"
												:max="3"
												:step="1"
												show-stops
											/>
											<span class="cups">数量:{{ carData[item.guid] }}</span>
										</div>

									</div>
								</div>
							</el-col>
						</el-row>




					</el-card>
				</div>
			</div>
		</div>

		<el-dialog
			v-model="centerDialogVisible"
			title="请选择支付方式!"
			center
			width="75%"
			class="dialog_box"
			:before-close="cancelOrder"
		>
			<div class="dialog_main">
				<span style="width: 100%; display: inline-block; text-align: center;">
					订单号：{{ ouid }}
				</span>
				<el-divider />
				<div class="cheapcode">
					优惠码:
					<el-input
						v-model="cheapCode"
						clearable
						style="width: 80%;"
						placeholder="非必填!如果有优惠码请输入以享受折扣"
						@change="verifyCheapCode"
					>

					</el-input>

				</div>
				<div
					class="money"
					v-if="finalPrice != 0"
				>
					支付金额:{{ money }} - {{ (money - finalPrice).toFixed(2) }} = {{ finalPrice }}¥
				</div>
				<div
					class="money"
					v-else
				>
					支付金额:{{ money }}¥
				</div>
			</div>
			<template #footer>
				<el-row class="pay">

					<el-col :span="8">
						<el-button
							plain
							class="bt alipay"
							@click="orderStatus('AliPay')"
						>
							<template #icon>
								<i class="bi bi-alipay"></i>
							</template>
							支付宝
						</el-button>
					</el-col>

					<el-col :span="8">
						<el-button
							plain
							class="bt wechatpay"
							@click="orderStatus('WeChatPay')"
						>
							<template #icon>
								<i class="bi bi-wechat"></i>
							</template>
							微信
						</el-button>
					</el-col>

					<el-col :span="8">
						<el-button
							plain
							class="bt cash"
							@click="orderStatus('Cash')"
						>
							<template #icon>
								<i class="bi bi-credit-card-fill"></i>
							</template>
							现金
						</el-button>
					</el-col>

				</el-row>
			</template>
		</el-dialog>

	</div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { getOrderMilkteaList } from "~/axios/milktea"
import { getshopserieslist } from "~/axios/series"
import { checkCode } from "~/axios/cheapcode"
import { postdata2generateOrder, delCanceledOrder, pay } from "~/axios/order"
import type { scrollTableT, payMethod } from "~/type"

const cheapCode = ref("")

const centerDialogVisible = ref(false)

let seriesScrollDistance: any = ref([0])

let milkteaData: any = ref({})
let seriesData: any = ref({})
// 动态计算总金额
let money = computed(() => {
	if (Object.keys(carData).length == 0) {
		return 0
	} else {
		let sum = 0
		for (let index = 0; index < Object.keys(carData).length; index++) {
			const ele = Object.keys(carData)[index];
			sum += parseFloat((carData[ele] * priceTable[ele] * discountTable[ele]).toFixed(2))
		}
		return sum;
	}
})

const finalPrice = ref(0)
const ouid = ref("")
const carData: any = reactive({})

const priceTable: any = reactive({})
const discountTable: any = reactive({})

const m1ref = ref()
const odref = ref()

const m1_2_TopOriginal = ref(0)
const m1_px = ref()

const active_menu_index = ref("0")

// 执行初始化操作
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
	const caleDistance = () => {
		for (let index = 0; index < seriesData.value.length; index++) {
			const ele = seriesData.value[index];
			seriesScrollDistance.value.push((ele.number * 162) + seriesScrollDistance.value[seriesScrollDistance.value.length - 1])
		}
	}

	// 计算priceTable 和discountTable
	const generatePriceAndDiscountTable = () => {
		for (let index = 0; index < milkteaData.value.length; index++) {
			const ele = milkteaData.value[index];
			priceTable[ele.guid] = ele.price
			discountTable[ele.guid] = ele.discount
		}
	}
	caleDistance()
	generatePriceAndDiscountTable()
}

onBeforeMount(() => {
	initfunc()
})

onMounted(() => {
	//记录原来的距离顶部距离(给css高度使用)
	m1_2_TopOriginal.value = m1ref.value.getBoundingClientRect().y
	m1_px.value = (m1_2_TopOriginal.value + 1) + "px"
})

const CarouselData: scrollTableT[] = reactive([{
	imageUrl: "http://pics.ip.jokeme.top:6280/2023-03-01/9mzy-thqm-9ida-m00j.png",
	title: "test",
	description: "test",
	price: "test",
}, {
	imageUrl: "http://pics.ip.jokeme.top:6280/2023-03-01/9mzy-thqm-9ida-m00j.png",
	title: "test",
	description: "test",
	price: "test",
}, {
	imageUrl: "http://pics.ip.jokeme.top:6280/2023-03-01/9mzy-thqm-9ida-m00j.png",
	title: "test",
	description: "test",
	price: "test",
}])

// 滚动到指定的地方
function scrollItemTo(params: number) {
	odref.value.scrollTo({ top: seriesScrollDistance.value[params] })
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
	carData[e.guid] = 1
}

// 当slider的值为0时,就切换显示动画
const sliderValueChange = (e: any, event: any) => {
	if (event == 0) {
		e.status = false
		delete carData[e.guid]
	}
}

// 从购物车移除操作
const removeFromCar = (e: any) => {
	e.status = null
	ElMessage.warning("已移除购物车!")
	delete carData[e.guid]
}

// 显示支付方式dialog
const showDialog = () => {
	if (money.value == 0) {
		ElMessage.error("购物车里没有商品!")
	} else {
		centerDialogVisible.value = true
		generateOrder()
	}

}

// 验证cheapcode,并提示用户享受的优惠
const verifyCheapCode = () => {
	if (cheapCode.value == "") {
		return;
	} else {
		checkCode(cheapCode.value).then(e => {
			if (e.errorStatus == false && e.singleDate.available == 'Y') {
				if (e.singleDate.content < 1) {
					ElMessage.success("您享受 " + e.singleDate.content + "折")
					finalPrice.value = parseFloat((money.value * e.singleDate.content).toFixed(2))
				} else {
					ElMessage.success("您享受 -" + e.singleDate.content + "¥优惠")
					finalPrice.value = parseFloat((money.value - e.singleDate.content).toFixed(2))
				}
			} else {
				ElMessage.warning(e.singleDate.msg)
			}
		}).catch(() => {
			ElMessage.error("网络错误!")
		})
	}

}

// 创建订单
const generateOrder = () => {
	postdata2generateOrder(carData, money.value).then(e => {
		if (!e.errorStatus) {
			ouid.value = e.dataList[0]
		}
	})
}

// 提交订单后支付成功后提示
const orderStatus = (e: payMethod) => {
	pay(e, ouid.value).then(e => {
		if (e == true) {
			ElMessage.success("支付成功!")
			centerDialogVisible.value = false
			
			const x = Object.keys(carData)
			
			for (let index = 0; index < x.length ; index++) {
				const element = x[index];
				delete carData[element]
				
			}
			initfunc()
		}else{
			ElMessage.error("支付失败!")
		}
	})


}

// 取消支付时会发送删除订单的请求
const cancelOrder = (done: () => void) => {
	finalPrice.value = 0
	cheapCode.value = ""
	delCanceledOrder(ouid.value)
	done()
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

.shopping {
	user-select: none;

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
			bottom: 80px;
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
						padding-right: 15px;

						.add2car {
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							padding-right: 5px;

							.icon {
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

							.number {
								display: flex;
								align-items: center;
								justify-content: center;
								flex-direction: column;
								width: 90%;
								padding: 0 2px;

								.cups {
									color: var(--ep-text-color-primary);
									font-weight: bold;
									font-family: var(--ep-font-family);
									font-size: var(--ep-font-size-base);
								}
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

	.dialog_box {
		.dialog_main {
			width: 100%;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.cheapcode {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: row;
			}

			.money {
				padding-top: 10px;
			}
		}

		.pay {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-evenly;


			.bt {
				width: 90%;
				padding: 3px;
			}


			.bt:hover {
				border: 1px solid var(--ep-border-color);
			}

			.bi {
				font-size: var(--ep-font-size-extra-large);
			}

			.alipay:hover {
				color: #0d6efd;
			}

			.wechatpay:hover {
				color: #2BA245;
			}

			.cash:hover {
				color: #712cf9;
			}

		}
	}
}
</style>