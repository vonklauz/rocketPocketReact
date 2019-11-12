//Подсчёт ежемесячных расходов и возвращение массива с ними
export const countCurrentSpending = variantData => {
	
	const {ownFunds, bankCredit, escrowCredit, investorA, investorB, buildingPeriods} = variantData;
	const sourcesArr = [ownFunds.changesArr, bankCredit.changesArr, escrowCredit.changesArr, investorA.changesArr, investorB.changesArr];
	
	return buildingPeriods.map((item, i) => countMonthlySpending(sourcesArr, i));

}

//Считаем конкретный месяц
const countMonthlySpending = (sourcesArr, month) => {
	
	let monthlySpending = 0;
	
	for ( let i = 0; i < sourcesArr.length; i++) {
		monthlySpending += sourcesArr[i][month] || 0;
	}
	
	return monthlySpending;
}