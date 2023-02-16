import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getMilkteaList() {
	const ax = axios({
		url: getbaseurl() + "getmilktealist",
		method: "get"
	}).then(res => {
		return res.data
	})
	return ax
}

function getMilkteaByGuid(guid: any) {
	const ax = axios({
		url: getbaseurl()+"getmilkteabyid",
		method: "get",
		params: {
			guid: guid,
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export { getMilkteaList,getMilkteaByGuid }