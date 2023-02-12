import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function uploadpic(e:any) {
	const ax = axios({
		url: getbaseurl()+"uploadpic",
		method: "post",
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data:{
			file:e
		}
	}).then(res => {
		return res.data
	})
	return ax
}