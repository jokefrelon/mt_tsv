import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getallseries() {
	const ax = axios({
		url: getbaseurl() + "getallseries",
		method: "get",
		timeout:5000
	}).then(res => {
		return res.data
	})
	return ax
}

export { getallseries }