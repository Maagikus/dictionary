export function getData() {

	let nowDate = new Date()


	const nowMonth = nowDate.getMonth()
	const currentDay = nowDate.getDate()
	const nowYear = nowDate.getFullYear()

	function get(data) {
		data = data.split('/');
		data = new Date(data[2], +data[1] - 1, +data[0], -168, 0, 0, 0);
		data = [data.getDate(), data.getMonth() + 1, data.getFullYear()];
		data = data.join('/').replace(/(^|\/)(\d)(?=\/)/g, "$10$2");

		return data

	}

	let weekAgoDate = get(`${currentDay}/${nowMonth + 1}/${nowYear}`)
	let dateWeekAgo = [...weekAgoDate.replace(/\//g, '').split('').slice(4, 8), ...weekAgoDate.replace(/\//g, '').split('').slice(2, 4), ...weekAgoDate.replace(/\//g, '').split('').slice(0, 2)].join('')


	const blabla = () => {
		if ((nowMonth + 1) < 10 && currentDay < 10) {
			return `${nowYear}0${nowMonth + 1}0${currentDay}`
		} else if ((nowMonth + 1) < 10 && currentDay >= 10) {
			return `${nowYear}0${nowMonth + 1}${currentDay}`
		} else if ((nowMonth + 1) >= 10 && currentDay < 10) {
			return `${nowYear}${nowMonth + 1}0${currentDay}`
		} else if ((nowMonth + 1) >= 10 && currentDay >= 10) {
			return `${nowYear}${nowMonth + 1}${currentDay}`
		}
	}
	let d = blabla()
	return dateWeekAgo
}
