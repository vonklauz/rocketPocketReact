import {connectCostsAndRevenue} from '../ConsolidateChartComponent';

export const countDynamicEscrowRate = (variantData, escrowChangesArrItem, month) => {
	
	const {salesIncreaseStep, interestRateReductionStep, escrowCredit} = variantData;
	const {rate} = escrowCredit;
	const revenueArr = connectCostsAndRevenue(variantData)[0];
	let monthEscrow = escrowChangesArrItem || 0;
	
	let howMuchPercents = countPercentOfSum(monthEscrow, revenueArr[month]) || 0;
	if(howMuchPercents === Infinity) howMuchPercents = 0;
	let a = (howMuchPercents - howMuchPercents % salesIncreaseStep) / salesIncreaseStep;
	let newRate = (rate - interestRateReductionStep * a) / 12;
	if(newRate * 12 < 0.6) newRate = 0.01 / 12;
	let escrowPercentsPayment = ((monthEscrow / 100) * newRate).toFixed(0);
	
	return [escrowPercentsPayment, (newRate * 12).toFixed(2)];
}

const countPercentOfSum = (a, b) => Math.floor(b / (a / 100));