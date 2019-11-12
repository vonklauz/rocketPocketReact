import React,{Fragment} from 'react';

import {countEstateTypeSalePrice} from './containers/countEstateTypeSalePrice';

const CostPriceCorrectionTable = ({variantData, onChange, isFinalCostCorrection=false}) => {
	
	const {buildingArea, estateTypes, estimate, costOfAttractiveResources, finalCostOfAttractiveResources, revenue} = variantData;
	
	/*Смета по умолчанию и с учётом стоимости привлечённых ресурсов*/
	let defaultCostPriceM2 = (estimate.default / buildingArea).toFixed(0);
	let correctedCostPriceM2;
	
	if (isFinalCostCorrection) {
		correctedCostPriceM2 = ((+estimate.default + finalCostOfAttractiveResources)/ buildingArea).toFixed(0);
	}
	
	else {
		correctedCostPriceM2 = ((+estimate.default + costOfAttractiveResources) / buildingArea).toFixed(0);
	}
	
	/*Следующие 5 переменных хранят в себе стоимости типов недвижимости БЕЗ учёта стоимости привлечённых ресурсов*/
	let flatsPrice = countEstateTypeSalePrice(estateTypes.flats, defaultCostPriceM2);
	let officesPrice = countEstateTypeSalePrice(estateTypes.offices, defaultCostPriceM2);
	let tradeAreaPrice = countEstateTypeSalePrice(estateTypes.tradeArea, defaultCostPriceM2);
	let storagesPrice = countEstateTypeSalePrice(estateTypes.storages, defaultCostPriceM2);
	let parkingPrice = countEstateTypeSalePrice(estateTypes.parking, defaultCostPriceM2);
	
    let finalFlatsPrice, finalOfficesPrice, finalTradeAreaPrice, finalStoragesPrice, finalParkingPrice, totalRevenue, totalProfit, profitInPercents;
	
	if (isFinalCostCorrection) {
		
		finalFlatsPrice = countEstateTypeSalePrice(estateTypes.flats, correctedCostPriceM2);
		
		finalOfficesPrice = countEstateTypeSalePrice(estateTypes.offices, correctedCostPriceM2);
		
		finalTradeAreaPrice = countEstateTypeSalePrice(estateTypes.tradeArea, correctedCostPriceM2);
		
		finalStoragesPrice = countEstateTypeSalePrice(estateTypes.storages, correctedCostPriceM2);
		
		finalParkingPrice = countEstateTypeSalePrice(estateTypes.parking, correctedCostPriceM2);
		
		totalRevenue = (finalFlatsPrice * estateTypes.flats.area) + (finalOfficesPrice * estateTypes.offices.area) + (finalTradeAreaPrice * estateTypes.tradeArea.area) + (finalStoragesPrice * estateTypes.storages.area) + (finalParkingPrice * estateTypes.parking.area);
		
		totalProfit = totalRevenue - (+estimate.default  + finalCostOfAttractiveResources);
		
		profitInPercents = (totalProfit / ((+estimate.default + finalCostOfAttractiveResources)/ 100)).toFixed(2);
	}
	
	/*Сумма выручки БЕЗ учёта стоимости привлечённых ресурсов*/
	let totalSales = ((flatsPrice * estateTypes.flats.area) + (officesPrice * estateTypes.offices.area) + (tradeAreaPrice * estateTypes.tradeArea.area) + (storagesPrice * estateTypes.storages.area) + (parkingPrice * estateTypes.parking.area)).toFixed(0);
	
	/*Добавление отступов для отображения больших чисел пользователю*/
	let defaultM2PriceToShow = defaultCostPriceM2.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
	let correctedM2PriceToShow = correctedCostPriceM2.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
	
	return (
		<Fragment>
			<h2 style={{marginTop:'40px'}}>Коррекция себестоимости и цены реализации</h2>
			<table className='app_table test' style={{marginTop:'10px'}}>
				<tbody>
					<tr>
						<th></th>
						<th>Квартиры</th>
						<th>Офисы</th>
						<th>Торг. площади</th>
						<th>Склады</th>
						<th>Парковка</th>
						<th>По объекту</th>
					</tr>
					<tr>
						<th>Себестоимость м2</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
</tr>
					<tr>
						<td className='app_table_td'>Без учёта стоимости привлечения фин. рес.</td>
						<td className='app_table_td centered-td-content'>{defaultM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{defaultM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{defaultM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{defaultM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{defaultM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{estimate.default.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
					</tr>
					<tr>
						<td className='app_table_td'>С учётом стоимости привлечения фин. рес.</td>
						<td className='app_table_td centered-td-content'>{correctedM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{correctedM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{correctedM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{correctedM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>{correctedM2PriceToShow}</td>
						<td className='app_table_td centered-td-content'>
						{isFinalCostCorrection ? String(+estimate.default + finalCostOfAttractiveResources).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(+estimate.default + costOfAttractiveResources).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
					</tr>
					<tr>
						<th>Планируемая рентабельность, %</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td className='app_table_td centered-td-content'>По типам недвижимости</td>
						<td className='app_table_td'><input className='td_input' name='estateTypes' data-type='flats' onChange={onChange} value={estateTypes.flats.markup} maxLength='4' disabled={isFinalCostCorrection}></input></td>
						<td className='app_table_td'><input className='td_input' name='estateTypes' data-type='offices' onChange={onChange} value={estateTypes.offices.markup} maxLength='4' disabled={isFinalCostCorrection}></input></td>
						<td className='app_table_td'><input className='td_input' name='estateTypes' data-type='tradeArea' onChange={onChange} value={estateTypes.tradeArea.markup} maxLength='4' disabled={isFinalCostCorrection}></input></td>
						<td className='app_table_td'><input className='td_input' name='estateTypes' data-type='storages' onChange={onChange} value={estateTypes.storages.markup} maxLength='4' disabled={isFinalCostCorrection}></input></td>
						<td className='app_table_td'><input className='td_input' name='estateTypes' data-type='parking' onChange={onChange} value={estateTypes.parking.markup} maxLength='4' disabled={isFinalCostCorrection}></input></td>
						<td className='app_table_td'></td>
					</tr>
					<tr>
						<th>Цена реализации м2</th>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr><td className='app_table_td'>Без учёта стоимости привлечения фин. рес.</td>
						<td className='app_table_td centered-td-content'>{flatsPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td className='app_table_td centered-td-content'>{officesPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td className='app_table_td centered-td-content'>{tradeAreaPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td className='app_table_td centered-td-content'>{storagesPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td className='app_table_td centered-td-content'>{parkingPrice.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						<td className='app_table_td centered-td-content'>{totalSales.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
					</tr>
					<tr>
						<td className='app_table_td'>С учётом стоимости привлечения фин. рес.</td>
						<td className='app_table_td centered-td-content'>
						{isFinalCostCorrection ? String(finalFlatsPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(estateTypes.flats.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
						</td>
						<td className='app_table_td centered-td-content'>
						{isFinalCostCorrection ? String(finalOfficesPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(estateTypes.offices.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
						</td>
						<td className='app_table_td centered-td-content'>
						{isFinalCostCorrection ? String(finalTradeAreaPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(estateTypes.tradeArea.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
						</td>
						<td className='app_table_td centered-td-content'>
						{isFinalCostCorrection ? String(finalStoragesPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(estateTypes.storages.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
						</td>
						<td className='app_table_td centered-td-content'>
						{isFinalCostCorrection ? String(finalParkingPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(estateTypes.parking.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
						</td>
						<td className='app_table_td centered-td-content'>
						{isFinalCostCorrection ? String(totalRevenue).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(revenue.withCostOfAttractiveResources).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
						</td>
					</tr>
					<tr>
						<th>
							Эффект
						</th>
					</tr>
					<tr>
						<th className='app_table_td'>Прибыль застройщика</th>
						<th className='app_table_td'>
							{isFinalCostCorrection ? String(totalProfit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : String(revenue.withCostOfAttractiveResources - (+estimate.default + costOfAttractiveResources)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
						</th>
					</tr>
					<tr>
						<th className='app_table_td'>Фактическая рентабельность, %</th>
						<th className='app_table_td'>
							{isFinalCostCorrection ? profitInPercents : 
							(revenue.withCostOfAttractiveResources / ((+estimate.default + costOfAttractiveResources) / 100) - 100).toFixed(2)}
						</th>
					</tr>
				</tbody>
			</table>
		</Fragment>
	)
}

export default CostPriceCorrectionTable;