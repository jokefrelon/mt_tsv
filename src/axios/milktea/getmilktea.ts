import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getMilkteaList() {
	const ax = axios({
		url: getbaseurl() + "getmilktealist",
		method: "get",
		timeout:5000
	}).then(res => {
		return res.data
	})
	return ax
}

function getMilkteaByGuid(guid: any) {
	const ax = axios({
		url: getbaseurl() + "getmilkteabyid",
		method: "get",
		timeout:5000,
		params: {
			guid: guid,
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export { getMilkteaList, getMilkteaByGuid }