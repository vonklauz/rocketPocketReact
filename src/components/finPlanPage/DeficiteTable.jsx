import React, {Fragment} from 'react';

import {connectCostsAndRevenue} from './ConsolidateChartComponent';

const DeficiteTable = ({variantData}) => {
	
	const salesArr = connectCostsAndRevenue(variantData)[0];
	const {escrowCredit, buildingPeriods} = variantData
	
	return (
		<Fragment>
			<h2 style={{marginTop:'20px'}}>Профицит / дефицит эскроу-ресурса в заданном режиме продаж</h2>
			<table className='app_table_small' style={{marginTop:'20px'}}>
			<tbody>
				<tr>
					<th>Месяц</th>
					<th>Разница между доступным и необходимым</th>
					<th>Нарастающий итог</th>
				</tr>
				{buildingPeriods.map((month, i) =>{
					
					let monthDeficite = ((salesArr[i] || 0) - (salesArr[i-1] || 0)) - ((escrowCredit.changesArr[i]|| 0) - (escrowCredit.changesArr[i-1]|| 0));
					
					let totalDeficite = (salesArr[i] || 0) - (escrowCredit.changesArr[i]|| 0);
					
					return (
						<tr key={Math.random()}>
							<td className='app_table_td'>{month}</td>
							<td className={monthDeficite >= 0 ? 'revenue_input centered-td-content app_table_td' : 'deficiteInput centered-td-content app_table_td'}>{String(monthDeficite).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
							<td className={totalDeficite >= 0 ? 'revenue_input centered-td-content app_table_td' : 'deficiteInput centered-td-content app_table_td'}>{String(totalDeficite).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
		</Fragment>
	);
}

export default DeficiteTable;