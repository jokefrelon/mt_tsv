import axios from 'axios';
import { getbaseurl } from "../baseurl";
import type { formT } from '~/type';

export default function updateMilkteaByGuid(mt: formT) {
	const ax = axios({
		url: getbaseurl() + "updatemilktea",
		method: "post",
		data: mt
	}).then(res => {
		return res.data
	})
	return ax
}
export { updateMilkteaByGuid }