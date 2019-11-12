import React from 'react';
import ObjectPageInputWrapper from './ObjectPageInputWrapper';

/*Это список с типами недвижимости, как минимум 1 из которых необходимо указать пользователю при создании объекта строительства.*/

const ObjectPageUl = ({isAnyInputFilled, parentState, onChange, dataType}) => (
	<ul className="objects-page__form__estate-types-list">
							<p>В том числе (м<sup>2</sup>)<span className="required_to_fill">*</span> :</p>
							{isAnyInputFilled ? null : <small className="required_to_fill">Заполните, как минимум, 1 тип недвижимости</small>}
							<li>
								<ObjectPageInputWrapper inputValue={parentState.flats.area} name={'flats'} onChange={onChange} isFilled={true} disabled={parentState.isShownSecondPart} dataType={dataType}>
									<label htmlFor={'flats'}>Квартиры:</label>
								</ObjectPageInputWrapper>
							</li>
							<li>
								<ObjectPageInputWrapper inputValue={parentState.offices.area} name={'offices'} onChange={onChange} isFilled={true} disabled={parentState.isShownSecondPart} dataType={dataType}>
									<label htmlFor={'offices'}>Офисы:</label>
								</ObjectPageInputWrapper>
							</li>
							<li>
								<ObjectPageInputWrapper inputValue={parentState.tradeArea.area} name={'tradeArea'} onChange={onChange} isFilled={true} disabled={parentState.isShownSecondPart} dataType={dataType}>
									<label htmlFor={'tradeArea'}>Торговые площади:</label>
								</ObjectPageInputWrapper>
							</li>
							<li>
								<ObjectPageInputWrapper inputValue={parentState.storages.area} name={'storages'} onChange={onChange} isFilled={true} disabled={parentState.isShownSecondPart} dataType={dataType}>
									<label htmlFor={'storages'}>Склад. помещения:</label>
								</ObjectPageInputWrapper>
							</li>
							<li>
								<ObjectPageInputWrapper inputValue={parentState.parking.area} name={'parking'} onChange={onChange} isFilled={true} disabled={parentState.isShownSecondPart} dataType={dataType}>
									<label htmlFor={'parking'}>Парковка:</label>
								</ObjectPageInputWrapper>
							</li>
	</ul>
);

export default ObjectPageUl;