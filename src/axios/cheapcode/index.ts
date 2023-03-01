import axios from 'axios';
import { getbaseurl } from "../baseurl";


function checkCode(code: string) {
	const ax = axios({
		url: getbaseurl() + "checkcode",
		method: "get",
		params: {
			code: code
		},
		timeout: 5000
	}).then(res => {
		return res.data
	})
	return ax
}

export { checkCode }