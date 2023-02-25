import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getallseries() {
	const ax = axios({
		url: getbaseurl() + "getallseries",
		method: "get",
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}
function getseriesbyname(e: string) {
	const ax = axios({
		url: getbaseurl() + "checkseries",
		method: "get",
		params: {
			seriesname: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}

function addseries(e: string) {
	const ax = axios({
		url: getbaseurl() + "addseries",
		method: "get",
		params: {
			series: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}

function delseries(e: string) {
	const ax = axios({
		url: getbaseurl() + "delseries",
		method: "get",
		params: {
			suid: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export { getallseries, getseriesbyname, addseries, delseries }