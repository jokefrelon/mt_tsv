// 定义类型

type formT = {
	guid: string
	name: string;
	price: number;
	intro: string;
	picurl: string;
	tips: string[];
	series: number;
	soldout: number;
	discount: number
} | undefined

type dataListT = {
	guid: string;
	intro: string;
	name: string;
	picurl: string;
	price: number;
	series: string;
	tips: string[];
	soldout: number;
	discount: number
} | undefined

type seriesT = {
	label: string,
	value: number,
} | undefined


type scrollTableT = {
	imageUrl: string
	title: string
	description: string
	price: string
} | undefined

type payMethod = "WeChatPay" | "AliPay" | "Cash"

type orderinfo = {
	ouid: string,
	order_detail: string,
	order_time: string,
	money: string,
	isdel: number,
	refund: number,
	del_time: string | null,
	refund_time: string | null,
	pay_method: payMethod | null,
	cheapcode: string | null,
	paid: string
} | null

export type { formT, dataListT, seriesT, scrollTableT, payMethod, orderinfo }