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

export type { formT, dataListT }