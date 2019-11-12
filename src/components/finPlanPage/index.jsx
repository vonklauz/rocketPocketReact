import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Doughnut, Line} from 'react-chartjs-2';

import {updateObject} from '../../actions/actionCreator';
import update from 'immutability-helper';

import InputWrapper from '../commonComponents/InputWrapper';
import FinPlanPageInputWrapper from './FinPlanPageInputWrapper';
import FinPlanPageSelectWrapper from './FinPlanPageSelectWrapper';
import SetPeriodsComponent from './SetPeriodsComponent';
import AddCashComponent from './AddCashComponent';
import ChartComponent from './ChartComponent';
import CountCostOfResourcesTable from './CountCostOfResourcesTable';
import CostPriceCorrectionTable from './CostPriceCorrectionTable';
import ConsolidateChartComponent from './ConsolidateChartComponent';
import DeficiteTable from './DeficiteTable';

import {setSalesAutoMode} from './containers/setSalesAutoMode';
import {addCashToChart} from './containers/addCashToChart';
import {buildPeriodsForChart} from './containers/buildPeriodsForChart';
import {countCurrentSpending} from './containers/countCurrentSpending';
import {countCostOfAttractiveResources} from './containers/countCostOfAttractiveResources';
import {countEstateTypeSalePrice} from './containers/countEstateTypeSalePrice';
import {countAvailableEscrow} from './containers/countAvailableEscrow';
import {countDynamicEscrowRate} from './containers/countDynamicEscrowRate';

class FinPlanComponent extends Component {
	
	constructor(props) {
		super(props)
		
		this.state = {
			chosenObject: false,
			chosenVariant: false,
			creatingVariant:false,
			variantData: {
				name:'',
				startOfBuildingMonth:'',
				startOfBuildingYear:'',
				endOfBuildingMonth:'',
				endOfBuildingYear:'',
				buildingPeriods:[],
				startOfSalesMonth:'',
				startOfSalesYear:'',
				endOfSalesMonth:'',
				endOfSalesYear:'',
				periodsOfSalesArr:[],
				chosenSource:'',
				sumOfCost:'',
				dateOfCost:'',
				sumOfSales:'',
				dateOfSales:'',
				interestRateReductionStep:'',
				salesIncreaseStep:'',
				costsArr:[],
				costOfAttractiveResources:'',
				finalCostOfAttractiveResources:'',
				buildingArea:'',
				estimate:{
					default:'',
					current:'',
					withCostOfAttractiveResources:'',
					changesArr:[],
				},
				ownFunds:{
					default:'',
					current:'',
					changesArr:[],
				},
				escrowCredit:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				bankCredit:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				investorA:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				investorB:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				deficiteOfFinancing:{
					default:'',
					current:'',
					changesArr:[],
				},
				revenue:{
					default:'',
					withCostOfAttractiveResources:'',
					current:'',
					autoSalesStep:'',
					changesArr:[],
				},
				availableEscrowResource:{
					percentOfSales:'',
					changesArr:'',
				},
				estateTypes: {
					flats:{
						area:'',
						markup:'',
						price:''
					},
					offices:{
						area:'',
						markup:'',
						price:''
					},
					tradeArea:{
						area:'',
						markup:'',
						price:''
					},
					storages:{
						area:'',
						markup:'',
						price:''
					},
					parking:{
						area:'',
						markup:'',
						price:''
					},
				},
				doughnutChart: false,
				expensesChart: false,
				costOfAttractiveResourcesTable: false,
				firstCostCorrectionTable: false,
				salesChart: false,
				consolidateChart: false,
				deficiteTable: false,
				secondCostCorrectionChart: false,
			},
		}
	}
	
	componentDidMount = () => {
		
	}
	
	setDefaultState = (objectEstimateValue = '', area='', defaultSalesSum='', flatsArea='', officesArea='', tradeAreas='', storagesArea='', parkingArea='') => {
		const {loadedObjects} = this.props;
		
		this.setState({
			chosenVariant: false,
			creatingVariant:false,
			variantData: {
				name:'',
				startOfBuildingMonth:'',
				startOfBuildingYear:'',
				endOfBuildingMonth:'',
				endOfBuildingYear:'',
				buildingPeriods:[],
				startOfSalesYear:'',
				endOfSalesMonth:'',
				endOfSalesYear:'',
				periodsOfSalesArr:[],
				chosenSource:'',
				sumOfCost:'',
				dateOfCost:'',
				sumOfSales:'',
				dateOfSales:'',
				interestRateReductionStep:'',
				salesIncreaseStep:'',
				costsArr:[],
				costOfAttractiveResources:'',
				finalCostOfAttractiveResources:'',
				buildingArea: area,
				estimate:{
					default: objectEstimateValue,
					current: objectEstimateValue,
					withCostOfAttractiveResources:'',
					changesArr:[],
				},
				ownFunds:{
					default:'',
					current:'',
					changesArr:[],
				},
				escrowCredit:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				bankCredit:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				investorA:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				investorB:{
					default:'',
					current:'',
					changesArr:[],
					rate:'',
				},
				deficiteOfFinancing:{
					default: objectEstimateValue,
					current: objectEstimateValue,
					changesArr:[],
				},
				revenue:{
					default: defaultSalesSum,
					withCostOfAttractiveResources:'',
					current:'',
					autoSalesStep:'',
					changesArr:[],
				},
				availableEscrowResource:{
					percentOfSales:'',
					changesArr:'',
				},
				estateTypes: {
					flats:{
						area: flatsArea,
						markup:'',
						price:''
					},
					offices:{
						area: officesArea,
						markup:'',
						price:''
					},
					tradeArea:{
						area: tradeAreas,
						markup:'',
						price:''
					},
					storages:{
						area: storagesArea,
						markup:'',
						price:''
					},
					parking:{
						area: parkingArea,
						markup:'',
						price:''
					},
				},
				doughnutChart: false,
				expensesChart: false,
				costOfAttractiveResourcesTable: false,
				firstCostCorrectionTable: false,
				salesChart: false,
				consolidateChart: false,
				deficiteTable: false,
				secondCostCorrectionChart: false,
			},
		});
	}
	
	chooseData = e => {
		const {loadedObjects} = this.props;
		
		this.setState ({
			[e.target.name]: e.target.value,
		})
		
		if(e.target.name === 'chosenObject') {
			
			if(e.target.value === 'false'){
				this.setDefaultState();
				this.setState({
					chosenObject: false
				});
			}
			
			else {
				this.setDefaultState(
					loadedObjects[e.target.value].general.estimate.value, 						loadedObjects[e.target.value].general.totalArea.value,
					loadedObjects[e.target.value].general.revenueExcludingCostOfBorrowedResources,
					loadedObjects[e.target.value].flats.area,
					loadedObjects[e.target.value].offices.area,
					loadedObjects[e.target.value].tradeArea.area,
					loadedObjects[e.target.value].storages.area,
					loadedObjects[e.target.value].parking.area
				);
			}
		}
		
		else if(e.target.name === 'chosenVariant') {
			
			if(e.target.value === 'false'){
				this.setDefaultState(
					loadedObjects[this.state.chosenObject].general.estimate.value, 						loadedObjects[this.state.chosenObject].general.totalArea.value,
					loadedObjects[this.state.chosenObject].general.revenueExcludingCostOfBorrowedResources,
					loadedObjects[this.state.chosenObject].flats.area,
					loadedObjects[this.state.chosenObject].offices.area,
					loadedObjects[this.state.chosenObject].tradeArea.area,
					loadedObjects[this.state.chosenObject].storages.area,
					loadedObjects[this.state.chosenObject].parking.area
				);
			}
			
			else {
				this.setState({
					variantData: {...loadedObjects[this.state.chosenObject].variantsOfFinancing[e.target.value]}
				});
			}
		}
		
	}
	
	getVariantName = e => {
		const variantName = update(this.state.variantData, {
			name:{$set: e.target.value}
		})
		
		this.setState({
			variantData: variantName
		});
	}
	
	getDefaultValue = e => {
		const newData = e.target.value.replace(/[^0-9.]/g, "");
		const {deficiteOfFinancing} = this.state.variantData;
		const newDeficite = (+deficiteOfFinancing.default) + (+this.state.variantData[e.target.name].default) - newData;
		const newState = update(this.state.variantData,{
			deficiteOfFinancing: {
				default:{$set: newDeficite},
				current:{$set: newDeficite}
			},
			[e.target.name]: {
				default: {$set: newData},
				current: {$set: newData}
			}
		
		});
		
		this.setState({
			variantData: newState
		});
	}
	
	getInputValue = e => {
		let newData;
		
		if (e.target.name.includes('Month') || e.target.name === 'chosenSource' || e.target.name === 'dateOfCost' || e.target.name === 'dateOfSales') {
			newData = e.target.value;
		}
		else {
			newData = e.target.value.replace(/[^0-9.]/g, "");
		}
		
		const newState = update(this.state.variantData,{
			[e.target.name]: {$set: newData}
		});
		
		/*if ( e.target.name === 'interestRateReductionStep' || e.target.name === 'salesIncreaseStep') {
			console.log(e.target.name)
			this.setState({
				variantData: newState
			},() => {
				if (this.state.variantData.interestRateReductionStep && this.state.variantData.salesIncreaseStep) {
					const isDynamicEscrowRate = true;
					this.updateCostOfAttRes(isDynamicEscrowRate);
				} 
				
				else {
					this.updateVariant();
				}
			});
		}*/
		
		this.setState({
			variantData: newState
		}, this.updateVariant);
	}
	
	createVariant = () => {
		const {loadedObjects} = this.props;
		this.setDefaultState(
					loadedObjects[this.state.chosenObject].general.estimate.value, 						loadedObjects[this.state.chosenObject].general.totalArea.value,
					loadedObjects[this.state.chosenObject].general.revenueExcludingCostOfBorrowedResources,
					loadedObjects[this.state.chosenObject].flats.area,
					loadedObjects[this.state.chosenObject].offices.area,
					loadedObjects[this.state.chosenObject].tradeArea.area,
					loadedObjects[this.state.chosenObject].storages.area,
					loadedObjects[this.state.chosenObject].parking.area
				);
		this.setState({
			creatingVariant: true,
		});
	}
	
	saveVariant = e => {
		/*e.preventDefault();*/
		
		const {loadedObjects, updateObject} = this.props;
		const objectId = this.state.chosenObject;
		const variantId = 'variantOfFinancing' + Math.random();
		const variantToSave = {...this.state.variantData};
		
		loadedObjects[objectId].variantsOfFinancing[variantId] = {...variantToSave};
		updateObject(objectId, loadedObjects[objectId]);
		
		this.setState ({
			chosenVariant: variantId,
			creatingVariant: false,
		});
	}
	
	updateVariant = () => {
		const {loadedObjects, updateObject} = this.props;
		const objectId = this.state.chosenObject;
		const variantId = this.state.chosenVariant;
		const variantToSave = {...this.state.variantData};
		
		loadedObjects[objectId].variantsOfFinancing[variantId] = {...variantToSave};
		updateObject(objectId, loadedObjects[objectId]);
	}
	
	deleteVariant = () => {
		const {loadedObjects, updateObject} = this.props;
		const objectId = this.state.chosenObject;
		const variantId = this.state.chosenVariant;
		
		delete loadedObjects[objectId].variantsOfFinancing[variantId];
		updateObject(objectId, loadedObjects[objectId]);
		this.setDefaultState(
					loadedObjects[this.state.chosenObject].general.estimate.value, 						loadedObjects[this.state.chosenObject].general.totalArea.value,
					loadedObjects[this.state.chosenObject].general.revenueExcludingCostOfBorrowedResources,
					loadedObjects[this.state.chosenObject].flats.area,
					loadedObjects[this.state.chosenObject].offices.area,
					loadedObjects[this.state.chosenObject].tradeArea.area,
					loadedObjects[this.state.chosenObject].storages.area,
					loadedObjects[this.state.chosenObject].parking.area
				);
	}
	
	countPercentsOfEstimate = value => (value / (this.state.variantData.estimate.default / 100)).toFixed(2);

	createChart = (startMonth, startYear, endMonth, endYear, chartName) => {
		
		const newState = update(this.state.variantData, {
			[chartName]: {$set: buildPeriodsForChart(startMonth, startYear, endMonth, endYear, [])}
		});
		
		this.setState({
				variantData: newState
			}, this.updateVariant)
	}

	addCash = (source, sum, month, periodsArrType, operation) => {
		
		const copyState = {...this.state.variantData}
		const [updateChangesArr, updateCurrentSum] = addCashToChart(copyState, sum, month, source, periodsArrType, operation);
		copyState[source].changesArr = updateChangesArr;
		const newState = update(this.state.variantData,{
			costsArr: {$set: countCurrentSpending(copyState)},
			[source]:{
				current: {$set: this.state.variantData[source].current - updateCurrentSum},
				changesArr:{$set: updateChangesArr}
			}
		})
		
		if(source !== 'revenue'){
			this.setState({
				variantData: newState
			}, this.updateCostOfAttRes)
		}
		
		else{
			this.setState({
				variantData: newState
			}, this.countEscrow)
		}
	}
	
	updateSourceRate = e => {
		let newRate = e.target.value.replace(/[^0-9.]/g, "") === '.' ? 0 : e.target.value.replace(/[^0-9.]/g, "");
		
		const newState = update(this.state.variantData,{
			[e.target.name]: {
				rate: {$set: newRate}
			}
		});
		
		this.setState({
			variantData: newState
		}, this.updateCostOfAttRes)
	}
	
	updateCostOfAttRes = (isDynamicEscrowRate=false) => {
		
		const {buildingPeriods, escrowCredit, bankCredit, investorA, investorB} = this.state.variantData;
		let escrowMonthPayment;
		let costOfAttractiveFinRes = 0;

		buildingPeriods.forEach((month,i) => {
			isDynamicEscrowRate ? escrowMonthPayment = countDynamicEscrowRate(this.state.variantData, escrowCredit.changesArr[i], i)[0] : escrowMonthPayment = countCostOfAttractiveResources(escrowCredit.rate, escrowCredit.changesArr[i])
			costOfAttractiveFinRes += +escrowMonthPayment + (+countCostOfAttractiveResources(bankCredit.rate, bankCredit.changesArr[i])) + (+countCostOfAttractiveResources(investorA.rate, investorA.changesArr[i])) + (+countCostOfAttractiveResources(investorB.rate, investorB.changesArr[i]))
		})
		
		if(isDynamicEscrowRate) {
			console.log(costOfAttractiveFinRes)
			const newState = update(this.state.variantData,{
				finalCostOfAttractiveResources: {$set: costOfAttractiveFinRes}
			})
			
			this.setState({
				variantData: newState
			}, this.updateVariant)
			
		}
		
		else {
			const newState = update(this.state.variantData,{
				costOfAttractiveResources: {$set: costOfAttractiveFinRes},
				revenue: {
					withCostOfAttractiveResources: {$set: costOfAttractiveFinRes + +this.state.variantData.revenue.default},
					current: {$set: costOfAttractiveFinRes + +this.state.variantData.revenue.default}
				}
			})
		
			this.setState({
			variantData: newState
			}, this.countTotalSalePrice)
		}
	}
	
	updateEstateTypeMarkup = e => {
		let newRate = e.target.value.replace(/[^0-9.]/g, "") === '.' ? 0 : e.target.value.replace(/[^0-9.]/g, "")
		
		const newState = update(this.state.variantData,{
			[e.target.name]:{
				[e.target.dataset.type]: {
					markup:{$set: newRate}
				}
			}
		})
		
		this.setState({
			variantData: newState
		}, this.countTotalSalePrice)
	}
	
	countTotalSalePrice = () => {
		
		const {estimate, buildingArea, revenue, costOfAttractiveResources} = this.state.variantData;
		const {flats, offices, tradeArea, storages, parking} = this.state.variantData.estateTypes;
		let costPrice = (+estimate.default + +costOfAttractiveResources) / buildingArea;
		let flatsPrice = countEstateTypeSalePrice(flats, costPrice);
		let officesPrice = countEstateTypeSalePrice(offices, costPrice);
		let tradeAreaPrice = countEstateTypeSalePrice(tradeArea, costPrice);
		let storagesPrice = countEstateTypeSalePrice(storages, costPrice);
		let parkingPrice = countEstateTypeSalePrice(parking, costPrice);
		
		let totalSalesPrice = (flatsPrice * flats.area) + (officesPrice * offices.area) + (tradeAreaPrice * tradeArea.area) + (storagesPrice * storages.area) + (parkingPrice * parking.area);
		
		const newState = update(this.state.variantData,{
			revenue:{
				withCostOfAttractiveResources:{$set: totalSalesPrice},
				current: {$set: totalSalesPrice}
			},
			estateTypes: {
				flats:{
					price:{$set: flatsPrice}
				},
				offices:{
					price:{$set: officesPrice}
				},
				tradeArea:{
					price:{$set: tradeAreaPrice}
				},
				storages:{
					price:{$set: storagesPrice}
				},
				parking:{
					price:{$set: parkingPrice}
				}
			}
		})
		
		this.setState({
			variantData: newState
		}, this.updateVariant)
	}
	
	autoSales = () => {
		const newState = update(this.state.variantData,{
			revenue: {
				current: {$set: this.state.variantData.revenue.withCostOfAttractiveResources},
				changesArr: {$set: []}
			}
		});
		
		this.setState({
			variantData: newState
		}, () => {
			const newState = update(this.state.variantData,{
				revenue: {$set: setSalesAutoMode(this.state.variantData)}
			})
			
			this.setState({
				variantData: newState
			}, this.countEscrow)
		})
	}
	
	getSumOfAutoSales = e => {
		const newState = update(this.state.variantData,{
			revenue: {
				autoSalesStep: {$set: e.target.value.replace(/[^0-9]/g, "")}
			}
		})
		
		this.setState({
			variantData: newState
		})
	}
	
	getPercentsOfAvailableEscrow = e => {
		const newState = update(this.state.variantData,{
			availableEscrowResource:{
				percentOfSales: {$set: e.target.value.replace(/[^0-9.]/g, "")}
			}
		})
		
		this.setState({
			variantData: newState
		}, this.updateVariant)
	}
	
	countEscrow = () => {
		const{revenue, availableEscrowResource} = this.state.variantData;
		
		const newState = update(this.state.variantData,{
			availableEscrowResource:{
				changesArr: {$set: countAvailableEscrow(revenue.changesArr, availableEscrowResource.percentOfSales)}
			}
		})
		
		this.setState({
			variantData: newState
		}, this.updateVariant)
	}
	
	render() {
		const {loadedObjects} = this.props;
		const {chosenObject, chosenVariant, creatingVariant,} = this.state;
		const {
			estimate, 
			ownFunds,
			bankCredit,
			escrowCredit,
			investorA,
			investorB,
			deficiteOfFinancing,
			name,
			buildingPeriods,
			periodsOfSalesArr,
			startOfBuildingMonth,
			startOfBuildingYear,
			endOfBuildingMonth,
			endOfBuildingYear,
			startOfSalesMonth,
			startOfSalesYear,
			endOfSalesMonth,
			endOfSalesYear,
			chosenSource,
			sumOfCost,
			dateOfCost,
			sumOfSales,
			dateOfSales,
			costsArr,
			costOfAttractiveResources,
			estateTypes,
			revenue,
			availableEscrowResource,
			interestRateReductionStep,
			salesIncreaseStep
		} = this.state.variantData;
		
		const dataForCostsChart = {
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
					}
				]
			};
		const dataForSalesChart = {
			labels: this.state.variantData.periodsOfSalesArr,
			datasets: [
				{
					label: 'Текущий объём выручки (план)',
					fill: false,
					lineTension: 0,
					steppedLine: false,
					backgroundColor: 'rgba(99, 199, 99, .2)',
					borderColor: 'rgb(99, 199, 99)',
					data: this.state.variantData.revenue.changesArr
					},
				{
					label: 'Доступный эскроу ресурс',
					fill: false,
					lineTension: 0,
					steppedLine: false,
					backgroundColor: 'rgba(99, 99, 199, .2)',
					borderColor: 'rgb(99, 99, 199)',
					data: this.state.variantData.availableEscrowResource.changesArr
					}
			]
		}
		return (
			<div className="financial-plan-page">
			<h1 className='page_header'>Объём и источники финансирования проекта (план)</h1>
			
			<FinPlanPageSelectWrapper loadedObjects={loadedObjects} onObjectChange={this.chooseData} onVariantChange={this.chooseData} onVariantDelete={this.deleteVariant} onVariantCreate={this.createVariant} parentState={this.state}/>
			
			<form action="" className="fin-plan__create-variant-form">
			{ this.state.chosenObject ?
			<InputWrapper 
				wrappingTagClass={'create-variant-form__sum-of-financing-wrapper'} 
				inputClass={0 > deficiteOfFinancing.default ? 'app_input required_to_fill' : 'app_input light_blue_color'}
				inputValue={estimate.default}
				inputName={'estimate'}
				onChange={()=>{}}
				disabled={true}
				>
				<label className={0 > deficiteOfFinancing.default ? 'required_to_fill' : null}>Общий объём финансирования</label>
				{0 > deficiteOfFinancing.default ? <p className='required_to_fill' style={{marginTop:'5px'}}>Превышен общий объём финансирования</p> : null}
			</InputWrapper> : null
			}
				
				<InputWrapper 
					wrappingTagClass={'create-variant-form__input-wrapper'} 
					inputClass={'app_input'} 
					inputValue={name}
					inputName={'name'}
					onChange={this.getVariantName}
					disabled={!creatingVariant}
					>
					<label>Название варианта</label>
					<small className='percents-of-totalValue required_to_fill'>обязательно к заполнению</small>
				</InputWrapper>
			
				<FinPlanPageInputWrapper inputValue={ownFunds.default} onChange={this.getDefaultValue} inputName={'ownFunds'} percent={ownFunds.default ? this.countPercentsOfEstimate(ownFunds.default) : null} isDisabled={!creatingVariant}>
					<label>Собственные средства</label>
				</FinPlanPageInputWrapper>
				
				<FinPlanPageInputWrapper inputValue={bankCredit.default} onChange={this.getDefaultValue} inputName={'bankCredit'} percent={bankCredit.default ? this.countPercentsOfEstimate(bankCredit.default) : null} isDisabled={!creatingVariant}>
					<label>Кредит банка под залог</label>
				</FinPlanPageInputWrapper>
				
				<FinPlanPageInputWrapper inputValue={escrowCredit.default} onChange={this.getDefaultValue} inputName={'escrowCredit'} percent={escrowCredit.default ? this.countPercentsOfEstimate(escrowCredit.default) : null} isDisabled={!creatingVariant}>
					<label>Эскроу-кредит банка</label>
				</FinPlanPageInputWrapper>
				
				<FinPlanPageInputWrapper inputValue={investorA.default} onChange={this.getDefaultValue} inputName={'investorA'} percent={investorA.default ? this.countPercentsOfEstimate(investorA.default) : null} isDisabled={!creatingVariant}>
					<label>Инвестор категории "А"</label>
				</FinPlanPageInputWrapper>
				
				<FinPlanPageInputWrapper inputValue={investorB.default} onChange={this.getDefaultValue} inputName={'investorB'} percent={investorB.default ? this.countPercentsOfEstimate(investorB.default) : null} isDisabled={!creatingVariant}>
					<label>Инвестор категории "В"</label>
				</FinPlanPageInputWrapper>
				
				<InputWrapper 
					wrappingTagClass={'create-variant-form__input-wrapper required_to_fill'} 
					inputClass={'app_input deficite-of-resources_input'} 
					inputValue={deficiteOfFinancing.default}
					inputName={'deficiteOfResources'}
					onChange={()=>{}}
					disabled={true}
					>
					<label>Дефицит ресурсов</label>
					<small className='percents-of-totalValue'>{deficiteOfFinancing.default ?this.countPercentsOfEstimate(deficiteOfFinancing.default) : null}% от общего объёма</small>
				</InputWrapper>
				
				{name && deficiteOfFinancing.default >= 0 && creatingVariant ? <button className='app_button big_button light_blue_button' onClick={this.saveVariant}>Сохранить объект</button> : null}
				
				{chosenVariant ?
				<div style={{position:'relative', width:'100%', marginTop:'40px'}}>
					<Doughnut 
						data={
							{
							labels: [
							'Собственные средства',
							'Кредит банка под залог',
							'Эскроу-кредит',
							'Инвестор кат. "А"',
							'Инвестор кат. "В"',
							'Дефицит ресурсов'
						],
							datasets: [{
							data: [+ownFunds.default, +bankCredit.default, +escrowCredit.default, +investorA.default, +investorB.default, +deficiteOfFinancing.default],
							backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
                			'rgba(54, 162, 235, 0.2)',
                			'rgba(255, 206, 86, 0.2)',
                			'rgba(125, 192, 192, 0.2)',
                			'rgba(153, 102, 255, 0.2)',
							'rgba(240, 52, 52, 0.8)'
							],
							borderColor:[
								'rgba(255, 99, 132, 1)',
                				'rgba(54, 162, 235, 1)',
                				'rgba(255, 206, 86, 1)',
                				'rgba(125, 192, 192, 1)',
                				'rgba(153, 102, 255, 1)',
								'rgba(240, 52, 52, 1)'
							],
							hoverBackgroundColor: [
							'rgba(255, 99, 132, 1)',
                			'rgba(54, 162, 235, 1)',
                			'rgba(255, 206, 86, 1)',
                			'rgba(125, 192, 192, 1)',
                			'rgba(153, 102, 255, 1)',
							'rgba(240, 52, 52, 1)'
							]
						}]
							}
						}
						width={500}
						height={280}
						options={{ maintainAspectRatio: false }}
					/>
				</div> : null}
			</form>
			
			{chosenVariant ?
			<section id="finPlanPageSecondPart" className='fin-plan-page_section'>
				<h1>График и источники финансирования проекта</h1>
				{buildingPeriods.length ?
				<div style={{width: '100%'}}>
					<ChartComponent chartData={dataForCostsChart}>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input'} inputValue={estimate.default} disabled={true}>
							<label>Общий объём финансирования</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input ownFundsInput'} inputValue={ownFunds.current} disabled={true}>
							<label>Собственные средства</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input bankCreditInput'} inputValue={bankCredit.current} disabled={true}>
							<label>Кредит банка под залог</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input escrowCreditInput'} inputValue={escrowCredit.current} disabled={true}>
							<label>Эскроу-кредит банка</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input investorAInput'} inputValue={investorA.current} disabled={true}>
							<label>Инвестор категории А</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input investorBInput'} inputValue={investorB.current} disabled={true}>
							<label>Инвестор категории В</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input deficiteInput'} inputValue={deficiteOfFinancing.current} disabled={true}>
							<label>Дефицит ресурсов</label>
							{null}
						</InputWrapper>
					</ChartComponent>
					<div className='chart-ui_wrapper' style={{marginTop: '20px'}}>
						Объём средств и источник финансирования:
						<AddCashComponent chosenSource={chosenSource} selectName={'chosenSource'} onSelectChange={this.getInputValue} sum={sumOfCost} inputName={'sumOfCost'} onInputChange={this.getInputValue}/>
						<p style={{marginTop: '20px'}}>Дата финансового вложения</p>
						<div className='chart-ui_input-wrapper'>
							<select className='app_input chart-ui_element chart-ui_select' value={dateOfCost} name={'dateOfCost'} onChange={this.getInputValue}>
								<option key={Math.random()} value=''>Месяц</option>
								{buildingPeriods.map( month => <option key={Math.random()} value={month}>{month}</option>)}
							</select>
						</div>
						<button className='app_button add_cash_button chart-ui_element light_blue_button' style={{marginTop: '20px'}} onClick={() => {
								this.addCash(chosenSource, sumOfCost, dateOfCost, buildingPeriods, '+')
							}}>+</button>
						<button className='app_button add_cash_button chart-ui_element delete_button' style={{marginLeft:'20px'}} onClick={() => {
								this.addCash(chosenSource, sumOfCost, dateOfCost, buildingPeriods, '-')
							}}>-</button>
					</div>
				</div>
				:
				<SetPeriodsComponent 
					firstSelectValue={startOfBuildingMonth}
					firstSelectName={'startOfBuildingMonth'}
					firstInputValue={startOfBuildingYear}
					firstInputName={'startOfBuildingYear'}
					secondSelectValue={endOfBuildingMonth}
					secondSelectName={'endOfBuildingMonth'}
					secondInputValue={endOfBuildingYear}
					secondInputName={'endOfBuildingYear'}
					onChange={this.getInputValue}
				>
					<p>Начало строительства</p>
					<p style={{marginTop: '20px'}}>Конец строительства</p>
					<button 
						style={{marginTop: '20px'}} 
						className='app_button big_button light_blue_button' 
						onClick={ () => {
							this.createChart(startOfBuildingMonth, startOfBuildingYear, endOfBuildingMonth, endOfBuildingYear, 'buildingPeriods'); 
							}
						}
					>
					Построить график</button>
				</SetPeriodsComponent>
				}
				{buildingPeriods.length ?
					<Fragment>
						<CountCostOfResourcesTable variantData={this.state.variantData} onChange={this.updateSourceRate}/>
						<CostPriceCorrectionTable variantData={this.state.variantData} onChange={this.updateEstateTypeMarkup}/>
					</Fragment>
					: null
				}
			</section> : null}
			{buildingPeriods.length ? 
			<section className='fin-plan-page_section'>
				<h1>Продажи / формирование эскроу-ресурса</h1>
				{periodsOfSalesArr.length? 
				<div style={{width: '100%'}}>
					<ChartComponent chartData={dataForSalesChart}>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input revenue_input'} inputValue={revenue.withCostOfAttractiveResources} disabled={true}>
							<label>Бюджет выручки</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input revenue_input'} inputValue={revenue.current} disabled={true}>
							<label>Остаток к выручке</label>
							{null}
						</InputWrapper>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input available-escrow_input'} inputValue={availableEscrowResource.percentOfSales} onChange={this.getPercentsOfAvailableEscrow}>
							<label>Доступный эскроу-ресурс в % от выручки</label>
							{null}
						</InputWrapper>
						<h3>Автоматический режим продаж</h3>
						<InputWrapper wrappingTagClass={''} inputClass={'app_input'} inputValue={revenue.autoSalesStep} onChange={this.getSumOfAutoSales}>
							<label>Средний объём продаж / мес.</label>
							{null}
						</InputWrapper>
						<button className={'app_button'} style={{padding:'5px 10px'}} onClick={this.autoSales}>Рассчитать</button>
					</ChartComponent>
					<div className='chart-ui_wrapper' style={{marginTop: '20px'}}>
						<h3>Ручной режим продаж</h3>
						<AddCashComponent chosenSource={chosenSource} selectName={'chosenSource'} onSelectChange={this.getInputValue} sum={sumOfSales} inputName={'sumOfSales'} onInputChange={this.getInputValue} isSelectNeeded={false}/>
						<p style={{marginTop: '20px'}}>Дата продаж</p>
						<div className='chart-ui_input-wrapper'>
							<select className='app_input chart-ui_element chart-ui_select' value={dateOfSales} name={'dateOfSales'} onChange={this.getInputValue}>
								<option key={Math.random()} value=''>Месяц</option>
								{periodsOfSalesArr.map( month => <option key={Math.random()} value={month}>{month}</option>)}
							</select>
						</div>
						<button className='app_button add_cash_button chart-ui_element light_blue_button' style={{marginTop: '20px'}} onClick={() => {
								this.addCash('revenue', sumOfSales, dateOfSales, periodsOfSalesArr, '+')
							}}>+</button>
						<button className='app_button add_cash_button chart-ui_element delete_button' style={{marginLeft:'20px'}} onClick={() => {
								this.addCash('revenue', sumOfSales, dateOfSales, periodsOfSalesArr, '-')
							}}>-</button>
					</div> 
				</div> : 
				<SetPeriodsComponent 
					firstSelectValue={startOfSalesMonth}
					firstSelectName={'startOfSalesMonth'}
					firstInputValue={startOfSalesYear}
					firstInputName={'startOfSalesYear'}
					secondSelectValue={endOfSalesMonth}
					secondSelectName={'endOfSalesMonth'}
					secondInputValue={endOfSalesYear}
					secondInputName={'endOfSalesYear'}
					onChange={this.getInputValue}
					>
						<p>Начало продаж</p>
						<p style={{marginTop: '20px'}}>Конец продаж</p>
						<button 
							style={{marginTop: '20px'}} 
							className='app_button big_button light_blue_button' 
							onClick={ () => {
								this.createChart(startOfSalesMonth, startOfSalesYear, endOfSalesMonth, endOfSalesYear, 'periodsOfSalesArr'); 
								}
							}
						>
						Построить график</button>
					</SetPeriodsComponent>}
			</section> : null}
			{periodsOfSalesArr.length ?
			<section className='fin-plan-page_section'>
				<h1>Доходы / расходы в заданном режиме продаж</h1>
				<div style={{width: '100%'}}>
					<ConsolidateChartComponent variantData={this.state.variantData}>
						<div>
							<label>Шаг роста продаж, %</label>
							<input className='app_input' value={salesIncreaseStep} onChange={this.getInputValue} name='salesIncreaseStep'></input>
						</div>
						<div>
							<label>Шаг снижения ставки, %</label>
							<input className='app_input' value={interestRateReductionStep} onChange={this.getInputValue} name='interestRateReductionStep'></input>
						</div>
						<button className={'app_button'} style={{padding:'5px 10px'}} onClick={() => {
								this.updateCostOfAttRes(true);
							}}>Обновить</button>
					</ConsolidateChartComponent>
				</div>
				<DeficiteTable variantData={this.state.variantData}/>
				{interestRateReductionStep && salesIncreaseStep ?
					<Fragment>
						<CountCostOfResourcesTable variantData={this.state.variantData} onChange={this.updateSourceRate} isDynamicEscrowRate={true}/>
						<CostPriceCorrectionTable variantData={this.state.variantData} onChange={this.updateEstateTypeMarkup} isFinalCostCorrection={true}/>
					</Fragment> : null
				}
			</section> : null
			}
		</div>
		);
	}
}

export {FinPlanComponent};

export default connect(state =>({
	loadedObjects: state.loadedObjects,
}),{updateObject})(FinPlanComponent);