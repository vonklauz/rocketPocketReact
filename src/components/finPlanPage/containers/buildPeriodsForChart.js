export const buildPeriodsForChart = (startMonth, startYear, endMonth, endYear, emptyPeriodsArr) => {

	if (startYear > endYear || startYear === endYear && startMonth > endMonth) {
		alert('Введите корректные данные.')
		return [];
	}
	
	emptyPeriodsArr = countOneYearInPeriodsArr(startMonth, 'Декабрь', startYear)

	if (startYear < endYear) {
		let currentYear = startYear + 1;

		while (currentYear < endYear + 1) {

			if (currentYear === endYear) {
				emptyPeriodsArr = [...emptyPeriodsArr, ...countOneYearInPeriodsArr('Январь', endMonth, currentYear)];
			} else {
				emptyPeriodsArr = [...emptyPeriodsArr, ...countOneYearInPeriodsArr('Январь', 'Декабрь',currentYear)]
				
			}
			currentYear++
		}
	}

	return emptyPeriodsArr;
}

const countOneYearInPeriodsArr = (startMonth, endMonth, year) => {
	
	const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	const periodsArr = [];
	
	for(let i = months.indexOf(startMonth); i < months.indexOf(endMonth)+1; i++) {
		periodsArr.push(months[i] + ' ' + year);
	}
	
	return periodsArr;
}