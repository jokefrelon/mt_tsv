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
	label:string,
	value:number,
} | undefined


type scrollTableT = {
	imageUrl: string
	title: string
	description: string
	price: string
} | undefined

type payMethod = "WeChatPay" | "AliPay" | "Cash"

export type { formT, dataListT ,seriesT,scrollTableT, payMethod}