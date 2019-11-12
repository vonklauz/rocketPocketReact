import React from 'react';
import {Line} from 'react-chartjs-2';

import ChartComponent from './ChartComponent';

const ConsolidateChartComponent = ({variantData, children}) => {
	
	const [consolidationChartSalesArr, consolidationChartAvailableEscrowArr] = connectCostsAndRevenue(variantData);
	
	const {
		buildingPeriods, 
		periodsOfSalesArr, 
		revenue, 
		availableEscrowResource,
		costsArr,
		estimate,
		ownFunds,
		bankCredit,
		escrowCredit,
		investorA,
		investorB
	} = variantData;
	
	const chartData = {
		labels: buildingPeriods,
			datasets: [{
					label: 'Общий объём финансирования (план)',
					fill: false,
					lineTension: 0,
					steppedLine: true,
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: buildingPeriods.map(() => estimate.default) 
					},
				{
					label: 'Текущий объём затрат',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
					lineTension: 0,
					fill: false,
					steppedLine: true,
					borderColor: 'rgb(0, 0, 0)',
					data: costsArr
					},
				{
					label: 'Собственные средства',
					backgroundColor: 'rgba(255, 99, 132, 0.1)',
					steppedLine: true,
					borderColor: 'rgba(255, 99, 132, 0.3)',
					data: ownFunds.changesArr
					},
				{
					label: 'Кредит банка под залог',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(54, 162, 235)',
					data: bankCredit.changesArr
					},
				{
					label: 'Кредит банка / эскроу ресурс',
					backgroundColor: 'rgba(255, 206, 86, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(255, 206, 86)',
					data: escrowCredit.changesArr
					},
				{
					label: 'Инвестор категории "А"',
					backgroundColor: 'rgba(125, 192, 192, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(125, 192, 192)',
					data: investorA.changesArr
					},
				{
					label: 'Инвестор категории "B"',
					backgroundColor: 'rgba(153, 102, 255, 0.2)',
					steppedLine: true,
					borderColor: 'rgb(153, 102, 255)',
					data: investorB.changesArr
					},
				{
					label: 'Текущий объём выручки (план)',
					fill: false,
					lineTension: 0,
					steppedLine: false,
					backgroundColor: 'rgba(99, 199, 99, .2)',
					borderColor: 'rgb(99, 199, 99)',
					data: consolidationChartSalesArr
					},
				{
					label: 'Доступный эскроу ресурс',
					fill: false,
					lineTension: 0,
					steppedLine: false,
					backgroundColor: 'rgba(99, 99, 199, .2)',
					borderColor: 'rgb(99, 99, 199)',
					data: consolidationChartAvailableEscrowArr
					}
				]	
	}
	
	return (
		<ChartComponent chartData={chartData}>
			{children}
		</ChartComponent>
	)
}

export const connectCostsAndRevenue = (variantData) => {
	
	const {buildingPeriods, periodsOfSalesArr, revenue, availableEscrowResource} = variantData;
	
	let [revenueArr, availableEscrowArr] = [[],[]];
	
	let startIndex = periodsOfSalesArr.indexOf(buildingPeriods[0]);
	
	if(startIndex > -1) {
		buildingPeriods.forEach( (item,i) =>{
			
			revenueArr[i] = (revenue.changesArr[startIndex] === undefined ? revenue.changesArr[revenue.changesArr.length - 1] : revenue.changesArr[startIndex]);
			
			availableEscrowArr[i] = (availableEscrowResource.changesArr[startIndex] === undefined ? availableEscrowResource.changesArr[availableEscrowResource.changesArr.length - 1] : availableEscrowResource.changesArr[startIndex]);
			
			startIndex++;
		});
	}
	
	else {
		startIndex = buildingPeriods.indexOf(periodsOfSalesArr[0]);
		buildingPeriods.forEach( (item,i) =>{
			if(i < buildingPeriods.indexOf(periodsOfSalesArr[0])) {
				revenueArr[i] = 0;
			}
			revenueArr[startIndex] = (revenue.changesArr[i] === undefined ? revenue.changesArr[revenue.changesArr.length - 1] : revenue.changesArr[i]);
			
			availableEscrowArr[startIndex] = (availableEscrowResource.changesArr[i] === undefined ? availableEscrowResource.changesArr[availableEscrowResource.changesArr.length - 1] : availableEscrowResource.changesArr[i]);
			
			startIndex++;
		});
	}
	return [revenueArr, availableEscrowArr];
}

export default ConsolidateChartComponent;