import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function axmtpost(data:any) {
	const ax = axios({
		url: getbaseurl()+"addmilktea",
		method:"post",
		data: data,
		timeout:5000
	}).then(res => {
		return res.data
	})
	return ax
}