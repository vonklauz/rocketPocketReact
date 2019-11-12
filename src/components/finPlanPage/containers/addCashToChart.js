export const addCashToChart = (variantData, sumInputValue, date, sourceName, periodsArrType, operation = '+') => {

	//Сумма из поля ввода вносимых/вычитаемых денежных средства, приведённая к типу числа
	let sum = +sumInputValue;
	//Массив изменений денежных вложений выбранного источника финансирования
	const sourceSpendingArr = [...variantData[sourceName].changesArr];
	//Укзанная дата денежного вложения/вычитания
	const indexOfDate = periodsArrType.indexOf(date);

	//Проверка вхождения даты в массиве периодов строительства/продаж
	if (indexOfDate < 0) {
		alert('Введите корректную дату.');
		return [sourceSpendingArr, 0];
	}

	//При операции вычитания достаточно проверить, не превышает ли вычитаемое число сумму денежного вложения в указанном месяце и возвести его в отрицательную степень
	if (operation === '-') {

		if (sum > (sourceSpendingArr[indexOfDate] || 0) - (sourceSpendingArr[indexOfDate - 1] || 0)) {
			alert('Введённое число превышает вложенный объём средств в выбранном периоде.');
			return [sourceSpendingArr, 0];
		}

		sum *= -1
	}

	if (operation === '+') {

		if (sum > variantData[sourceName].current) {
			alert('Введённое число превышает остаток денежных средств у выбранного источника финансирования.');
			return [sourceSpendingArr, 0];
		}
	}

	for (let i = indexOfDate; i < periodsArrType.length; i++) {
		sourceSpendingArr[i] = (sourceSpendingArr[i] || 0) + sum;
	}

	return [sourceSpendingArr, sum];
}
