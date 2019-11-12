import {addCashToChart} from './addCashToChart';

export const setSalesAutoMode = (variantData) => {
	
	const copyState = {...variantData};
	copyState.revenue = {...variantData.revenue}
	const {periodsOfSalesArr} = variantData;
	const {revenue} = copyState;
	let sumToAdd;
	revenue.changesArr[0] = 0;
	periodsOfSalesArr.forEach( (month, i) => {
		if(i > 0) {
			if (revenue.current > revenue.autoSalesStep) {
				sumToAdd = revenue.autoSalesStep
			}
			else {
				sumToAdd = revenue.current
			}
				let revArr = addCashToChart(copyState, sumToAdd, month, 'revenue', periodsOfSalesArr)[0];
				revenue.changesArr = revArr;
				revenue.current -= sumToAdd;
		}
	})
	return revenue;
}
