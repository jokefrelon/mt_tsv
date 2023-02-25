import axios from 'axios';
import { getbaseurl } from "../baseurl";
import type { formT } from '~/type';

function axmtpost(data: any) {
	const ax = axios({
		url: getbaseurl() + "addmilktea",
		method: "post",
		data: data,
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}

function deletemilkteabyguid(e: any) {
	const ax = axios({
		url: getbaseurl() + "delmilktea",
		method: "get",
		params: {
			guid: e,
		}
	}).then(res => {
		return res.data
	})
	return ax
}

function getMilkteaList() {
	const ax = axios({
		url: getbaseurl() + "getmilktealist",
		method: "get",
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}

function getMilkteaByGuid(guid: any) {
	const ax = axios({
		url: getbaseurl() + "getmilkteabyid",
		method: "get",
		timeout: 5000,
		params: {
			guid: guid,
		}
	}).then(res => {
		return res.data
	})
	return ax
}

function updateMilkteaByGuid(mt: formT) {
	const ax = axios({
		url: getbaseurl() + "updatemilktea",
		method: "post",
		data: mt
	}).then(res => {
		return res.data
	})
	return ax
}
export { axmtpost, deletemilkteabyguid, getMilkteaList, getMilkteaByGuid, updateMilkteaByGuid }