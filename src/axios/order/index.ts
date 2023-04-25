import axios from 'axios';
import { payMethod } from '~/type';
import { getbaseurl } from "../baseurl";

function postdata2generateOrder(e: any, money: number) {
	const ax = axios({
		url: getbaseurl() + "generateorder",
		method: "post",
		params: {
			money: money
		},
		data: e,
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}

function delCanceledOrder(ouid: string) {
	const ax = axios({
		url: getbaseurl() + "delCancelOrder",
		method: "get",
		params: {
			ouid: ouid
		},
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}

function pay(paymethod: payMethod, ouid: string) {
	const ax = axios({
		url: getbaseurl() + "payOrder",
		method: "get",
		params: {
			payMethod: paymethod,
			ouid: ouid
		},
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}

function getOrderPageList(page: number, size: number) {
	const ax = axios({
		url: getbaseurl() + "getOrderPage",
		method: "get",
		params: {
			page: page,
			size: size
		},
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}

function refundbyouid(ouid: string){
	const ax = axios({
		url:getbaseurl()+"refund",
		method:"get",
		params:{
			ouid: ouid
		},
		timeout:5000
	}).then(res => {
		return res.data
	})
	return ax
}

function deleteRecordFromorderinfo(ouid: string){
	const ax = axios({
		url:getbaseurl()+"deleteorderinfo",
		method:"get",
		params:{
			ouid: ouid
		},
		timeout:5000
	}).then(res => {
		return res.data
	})
	return ax
}



export { postdata2generateOrder, delCanceledOrder, pay, getOrderPageList, refundbyouid, deleteRecordFromorderinfo}