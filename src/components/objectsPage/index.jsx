import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addObject, deleteObject} from '../../actions/actionCreator';

import Button from '../commonComponents/Button';
import InputWrapper from '../commonComponents/InputWrapper';
import ObjectPageInputWrapper from './ObjectPageInputWrapper';
import ObjectPageUl from './ObjectPageUl';
import ObjectPageDynamicUl from './ObjectPageDynamicUl';
import ObjectsPageSelectWrapper from './ObjectsPageSelectWrapper';


class ObjectsPageComponent extends Component {

	constructor(props) {
		super(props)
		
		this.state = {
			general: {
				name:{
					value:'',
					isFilled: true,
				},
				estimate: {
					value:'',
					isFilled: true,
				},
				totalArea:{
					value: '',
					isFilled: true,
				},
				detailedDescription: '',
				m2CostPrice: '',
				revenueExcludingCostOfBorrowedResources: '',
			},
			flats: {
				area:'',
				markup: '',
				price: '',
			},
			offices: {
				area:'',
				markup: '',
				price: '',
			},
			tradeArea: {
				area:'',
				markup: '',
				price: '',
			},
			storages: {
				area:'',
				markup: '',
				price:'',
			},
			parking: {
				area:'',
				markup: '',
				price: '',
			},
			isEstateTypeIndicated: true,
			isShownSecondPart: false,
			isChosenObject: false,
		}
	}
	
	componentDidMount = () => {
		console.log(this.props);
	}
	
	getNumberInputValue = e => {
		const valToCheck = e.target.value.replace(/[^0-9.]/g, "");
		const dataForRefreshingState = isNaN(+valToCheck) || +valToCheck < 1 ? '' : valToCheck;
		const statePropName = e.target.name;
		if (statePropName === 'estimate' || statePropName === 'totalArea') {
			
			const updateGeneral = {...this.state.general};
			updateGeneral[statePropName].value = dataForRefreshingState;
			updateGeneral[statePropName].isFilled = dataForRefreshingState ? true : false
			
			
			this.setState({
				general: {...updateGeneral}
			})
		}

		else {
			const updateEstateType = {...this.state[statePropName]}
			updateEstateType[e.target.dataset.type] = dataForRefreshingState
			
			this.setState({
				[statePropName]: {...updateEstateType},
			});
		}
	}
	
	getStringInputValue = e => {
		
		const statePropName = e.target.name;
		const updateGeneral = {...this.state.general};
		
		if (statePropName === 'name') {
			
			updateGeneral[statePropName].value = String(e.target.value);
			updateGeneral[statePropName].isFilled = e.target.value ? true : false
		}
		
		else {
			updateGeneral[statePropName] = String(e.target.value);
		}
		
		this.setState ({
				general: {...updateGeneral}
			});
	}
	
	setDefaultState = () => {
		const defaultState = {
			general: {
				name:{
					value:'',
					isFilled: true,
				},
				estimate: {
					value:'',
					isFilled: true,
				},
				totalArea:{
					value: '',
					isFilled: true,
				},
				detailedDescription: '',
				m2CostPrice: '',
				revenueExcludingCostOfBorrowedResources: '',
			},
			flats: {
				area:'',
				markup: '',
				price: '',
			},
			offices: {
				area:'',
				markup: '',
				price: '',
			},
			tradeArea: {
				area:'',
				markup: '',
				price: '',
			},
			storages: {
				area:'',
				markup: '',
				price:'',
			},
			parking: {
				area:'',
				markup: '',
				price: '',
			},
			isEstateTypeIndicated: true,
			isShownSecondPart: false,
			isChosenObject: false,
			variantsOfFinancing: {},
		};
		
		const resetData = ({objects, ...rest}) => ({...defaultState, objects})
		
		this.setState({
			...resetData(this.state)
		});
	}
	
	checkRequiredFields = ({general}) => {
		if (general.name.value && general.estimate.value && general.totalArea.value) {
			const isCorrectArea = this.checkEstateAreas(this.state)
			
			this.setState({
				isEstateTypeIndicated: isCorrectArea,
				isShownSecondPart: isCorrectArea,
			});
		}
	}
	
	checkEstateAreas = ({general, flats, offices, tradeArea, storages, parking}) => +general.totalArea.value === (+flats.area) + (+offices.area) + (+tradeArea.area) + (+storages.area) + (+parking.area);
	
	countM2CostPrice = () => {
		
		const updateGeneral = {...this.state.general};
		updateGeneral.m2CostPrice = (+updateGeneral.estimate.value / +updateGeneral.totalArea.value).toFixed(0);
		
		this.setState ({
			general: {...updateGeneral}
		})
	}
	
	countEstateTypePrice = estateType => estateType.price = (+this.state.general.m2CostPrice / 100 * +estateType.markup + +this.state.general.m2CostPrice).toFixed(0);

	countRevenueOfObject = () => {
		
		const updateState = {...this.state};
		let revenueOfObject = 0;
		const estateTypesArr = Object.keys(this.state).filter(key => !key.includes('objects')&&!key.includes('general') && !key.includes('isShownSecondPart') && !key.includes('isEstateTypeIndicated'));
		
		estateTypesArr.map( item => {
			if (updateState[item].area) {
				this.countEstateTypePrice(updateState[item]);
				revenueOfObject += updateState[item].price * updateState[item].area;
			}
			
		});
		
		updateState.general.revenueExcludingCostOfBorrowedResources = revenueOfObject;
		this.setState({
			...updateState
		});
	}
	
	saveObject = ({...stateData}) => {
		const {addObject} = this.props;
		const objectToSave = {...stateData};
		
		objectToSave.id = 'objectOfBuilding' + Math.random();
		objectToSave.isChosenObject = true;
		addObject(objectToSave.id, objectToSave);
		
		this.setState({
			...objectToSave,
			isChosenObject: objectToSave.id
		})
	}
	
	chooseObject = e => {
		
		const {loadedObjects} = this.props;
		
		if(e.target.value.includes('objectOfBuilding')) {
			this.setState({
				...loadedObjects[e.target.value],
				isChosenObject: e.target.value
			});
		}
		else {
			this.setDefaultState();
		}
	}
	
	deleteObject = () => {
		const {deleteObject} = this.props;
		deleteObject(this.state.id);
		this.setDefaultState();
	}

	render() {
		const {name, estimate, totalArea, detailedDescription, m2CostPrice,} = this.state.general;
		const {loadedObjects} = this.props;
		return (
			<div className="objects-page">
			<h1 className='page_header'>Информация об объекте</h1>
			
			<section className="objects-page__half" id="firstHalf">
			
				<ObjectsPageSelectWrapper
					onChange={this.chooseObject}
					onCreate={this.setDefaultState}
					onDelete={this.deleteObject}
					dataObj={loadedObjects}
					parentState={this.state}
				/>
			
				<form action="" className="objects-page__form">
				
					<div className="objects-page__form__half">
										
						<ObjectPageInputWrapper inputValue={name.value} inputId={"objectName"} onChange={this.getStringInputValue} isFilled={name.isFilled} disabled={this.state.isShownSecondPart} name={'name'} >
							<label htmlFor={"objectName"}>Название объекта<span className="required_to_fill">*</span> : </label>
						</ObjectPageInputWrapper>
					
						<ObjectPageInputWrapper inputValue={estimate.value} inputId={"objectEstimate"} onChange={this.getNumberInputValue} isFilled={estimate.isFilled} disabled={this.state.isShownSecondPart} name={'estimate'}>
							<label htmlFor={"objectEstimate"}>Сметная стоимость объекта<span className="required_to_fill">*</span> : </label>
						</ObjectPageInputWrapper>
						
						<ObjectPageInputWrapper inputValue={totalArea.value} inputId={"objectArea"} onChange={this.getNumberInputValue} isFilled={totalArea.isFilled} disabled={this.state.isShownSecondPart} name={'totalArea'}>
							<label htmlFor={"objectArea"}>Объём м2 к реализации<span className="required_to_fill">*</span></label>
						</ObjectPageInputWrapper>
						
						<ObjectPageUl isAnyInputFilled={this.state.isEstateTypeIndicated} parentState={this.state} onChange={this.getNumberInputValue} dataType={'area'}/>
						
					</div>
					
					<div className="objects-page__form__half">
						<textarea id="detailedDescription" className="app_input" cols="30" rows="10" placeholder="Подробное описание объекта" maxLength='1000' value={detailedDescription} onChange={this.getStringInputValue} name='detailedDescription' disabled={this.state.isShownSecondPart}></textarea>
						<small id="areaSmall">{detailedDescription.length}/1000</small>
					</div>
					
				</form>
				
				{!this.state.isShownSecondPart ?
				<Button className={"app_button big_button light_blue_button"} id={"objectPassportNextStepButton"} 
				onClick={() =>{
							this.checkRequiredFields(this.state);
							this.countM2CostPrice();
						}}>Далее</Button> : null}
				
			</section>
			{this.state.isShownSecondPart ?
			<section className="objects-page__half" id="secondHalf">
			
				<InputWrapper wrappingTagClass={'objects-page__form__input-wrapper centered-content'} inputClass={'app_input objects-page__form__input'} inputId={'m2OwnCostInput'} inputValue={this.state.general.m2CostPrice} disabled={true}>
					<label htmlFor="m2OwnCostInput">Себестоимость 1 м2 без(!) затрат на привлечение финансовых ресурсов</label>
					{null}
				</InputWrapper>
				
				<form action="" className="objects-page__form">
				
					<div className="objects-page__form__half flex-end_half">
					
						<ObjectPageDynamicUl title={'Рентабельность, %'} parentState={this.state} onChange={	this.getNumberInputValue} dataType={'markup'} disabled={this.state.isChosenObject}>
							{this.state.isChosenObject ? null : <Button className={"app_button small_button simple_button"} id={"countPriceButton"} onClick={this.countRevenueOfObject}>Рассчитать</Button>}
						</ObjectPageDynamicUl>
						
					</div>
					
					<div className="objects-page__form__half">
						<ObjectPageDynamicUl title={'Цена реализации 1 м2'} parentState={this.state} dataType={'price'} disabled={true}>
						</ObjectPageDynamicUl>
					</div>
					
				</form>
				
				<InputWrapper wrappingTagClass={'objects-page__form__input-wrapper centered-content'} inputClass={'app_input objects-page__form__input'} inputId={'totalRevenue'} inputValue={this.state.general.revenueExcludingCostOfBorrowedResources} disabled={true}>
					<label htmlFor="totalRevenue">Бюджет выручки без(!) затрат на привлечение финансовых ресурсов</label>
					{null}
				</InputWrapper>
				
				{this.state.isChosenObject === false  && this.state.general.revenueExcludingCostOfBorrowedResources !== '' ?  <Button className={"app_button big_button light_blue_button"} id={"volumesOfCashSaveButton"} onClick={() =>{this.saveObject(this.state)}}>Сохранить новый объект</Button> : null}
				
			</section> : null}
		</div>
		);
	}
}

export {ObjectsPageComponent};
export default connect(state =>({
	loadedObjects: state.loadedObjects,
}),{addObject, deleteObject})(ObjectsPageComponent);