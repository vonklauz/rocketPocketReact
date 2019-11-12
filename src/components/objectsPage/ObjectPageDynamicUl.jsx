import React from 'react';

import ObjectPageInputWrapper from './ObjectPageInputWrapper';

const ObjectPageDynamicUl = ({ parentState, onChange=()=>{}, disabled, title, children, dataType}) => (
	<ul className="objects-page__form__estate-types-list">
							<p>{title}</p>
							{parentState.flats.area?
							<li>
								<ObjectPageInputWrapper inputValue={parentState['flats'][dataType]} onChange={onChange} isFilled={true} disabled={disabled} name={'flats'} dataType={dataType}>
									<label>Квартиры:</label>
								</ObjectPageInputWrapper>
							</li> : null}
							{parentState.offices.area?
							<li>
								<ObjectPageInputWrapper inputValue={parentState['offices'][dataType]} onChange={onChange} isFilled={true} disabled={disabled} name={'offices'} dataType={dataType}>
									<label>Офисы:</label>
								</ObjectPageInputWrapper>
							</li> : null}
							{parentState.tradeArea.area?
							<li>
								<ObjectPageInputWrapper inputValue={parentState['tradeArea'][dataType]} onChange={onChange} isFilled={true} disabled={disabled} name={'tradeArea'} dataType={dataType}>
									<label>Торговые площади:</label>
								</ObjectPageInputWrapper>
							</li> : null}
							{parentState.storages.area?
							<li>
								<ObjectPageInputWrapper inputValue={parentState['storages'][dataType]} onChange={onChange} isFilled={true} disabled={disabled} name={'storages'} dataType={dataType}>
									<label>Склад. помещения:</label>
								</ObjectPageInputWrapper>
							</li> : null}
							{parentState.parking.area?
							<li>
								<ObjectPageInputWrapper inputValue={parentState['parking'][dataType]} onChange={onChange} isFilled={true} disabled={disabled} name={'parking'} dataType={dataType}>
									<label>Парковка:</label>
								</ObjectPageInputWrapper>
							</li> : null}
							{children ? <li className="objects-page__form__input-wrapper">{children}</li> : null}
	</ul>
);

export default ObjectPageDynamicUl;