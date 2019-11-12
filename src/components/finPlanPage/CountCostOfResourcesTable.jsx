import React, {Fragment} from 'react';

import {countCostOfAttractiveResources} from './containers/countCostOfAttractiveResources';
import {countDynamicEscrowRate} from './containers/countDynamicEscrowRate';


const CountCostOfResourcesTable = ({variantData, onChange, isDynamicEscrowRate=false}) => {
	const {buildingPeriods, escrowCredit, bankCredit, investorA, investorB, interestRateReductionStep, salesIncreaseStep} = variantData;
	
	let [totalCostOfAttractiveRes, totalCostOfEscrowCredit, totalCostOfBankCredit, totalCostOfInvestorA, totalCostOfInvestorB] = [0,0,0,0,0];
	let monthCostEscrow,currentMonthEscrowRate;
	
	return (
		<Fragment>
		<h2 style={{marginTop:'40px'}}>Определение стоимости привлечения ресурсов</h2>
		<table style={{marginTop:'10px'}} className='app_table'>
			<tbody>
				<tr>
										<th>Источник:</th>
										<th className="escrowCreditInput">Эскроу-кредит банка</th>
										{isDynamicEscrowRate ?
											<th className="escrowCreditInput">Коррекция % ставки эскроу-кредита</th> : null
										}
										<th className="bankCreditInput">Кредит банка под залог</th>
										<th className="investorAInput">Инвестор категории "А"</th>
										<th className="investorBInput">Инвестор категории "В"</th>
										<th>Сумма ежемесячных выплат по %</th>
									</tr>
				<tr>
										<th className='app_table_td'>Ставка, %:</th>
										<th className="escrowCreditInput">
											<input className='app_input' maxLength='4' onChange={onChange} name='escrowCredit' value={escrowCredit.rate} disabled={isDynamicEscrowRate}></input>
										</th>
										{isDynamicEscrowRate ?
											<td className='app_table_td escrowCreditInput centered-td-content'></td> : null
										}
										<th className="bankCreditInput" >
											<input className='app_input' maxLength='4' onChange={onChange} name='bankCredit' value={bankCredit.rate} disabled={isDynamicEscrowRate}></input>
										</th>
										<th className="investorAInput">
											<input className='app_input' maxLength='4' onChange={onChange} name='investorA' value={investorA.rate} disabled={isDynamicEscrowRate}></input></th>
										<th className="investorBInput">
											<input className='app_input' maxLength='4' onChange={onChange}  name='investorB' value={investorB.rate} disabled={isDynamicEscrowRate}></input></th>
										<th></th>
									</tr>
				<tr>
										<th className='app_table_td'>Месяц</th>
										<th className="escrowCreditInput"></th>
										{isDynamicEscrowRate ?
										<td className='app_table_td escrowCreditInput centered-td-content'></td> : null
										}
										<th className="bankCreditInput"></th>
										<th className="investorAInput"></th>
										<th className="investorBInput"></th>
										<th></th>
									</tr>
					{buildingPeriods.map( (month, i) => {
					
						if(isDynamicEscrowRate){
							[monthCostEscrow, currentMonthEscrowRate] = countDynamicEscrowRate(variantData, (escrowCredit.changesArr[i] || 0), i);
							
						}
					
						else {
							monthCostEscrow = +countCostOfAttractiveResources(escrowCredit.rate, escrowCredit.changesArr[i]);
						}

						let montCostBankCredit = +countCostOfAttractiveResources(bankCredit.rate, bankCredit.changesArr[i]);

						let montCostInvestorA = +countCostOfAttractiveResources(investorA.rate, investorA.changesArr[i]);

						let montCostInvestorB = +countCostOfAttractiveResources(investorB.rate, investorB.changesArr[i]);

						let totalMontlyCost = +monthCostEscrow+ montCostBankCredit+ montCostInvestorA+ montCostInvestorB;

						totalCostOfEscrowCredit += +monthCostEscrow;
						totalCostOfBankCredit += montCostBankCredit;
						totalCostOfInvestorA += montCostInvestorA;
						totalCostOfInvestorB += montCostInvestorB;
						totalCostOfAttractiveRes += totalMontlyCost;
										
						return (
							<tr>
								<td className='app_table_td'>{month}</td>
								<td className='app_table_td escrowCreditInput centered-td-content'>{String(monthCostEscrow).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
								{isDynamicEscrowRate ?
									<td className='app_table_td escrowCreditInput centered-td-content'>{currentMonthEscrowRate}</td> : null
								}
								<td className='app_table_td bankCreditInput centered-td-content'>{String(montCostBankCredit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
								<td className='app_table_td investorAInput centered-td-content'>{String(montCostInvestorA).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
								<td className='app_table_td investorBInput centered-td-content'>{String(montCostInvestorB).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
								<td className='app_table_td centered-td-content'>{String(totalMontlyCost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</td>
							</tr>
						)
					})
					}
					<tr>
										<th className='app_table_td'>Итого по отдельным источникам:</th>
										<th className='escrowCreditInput'>{String(totalCostOfEscrowCredit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</th>
										{isDynamicEscrowRate ?
										<td className='app_table_td escrowCreditInput centered-td-content'></td> : null
										}
										<th className='bankCreditInput'>{String(totalCostOfBankCredit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</th>
										<th className='investorAInput'>{String(totalCostOfInvestorA).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</th>
										<th className='investorBInput'>{String(totalCostOfInvestorB).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</th>
										<th></th>
									</tr>
					<tr>
										<th></th>
										<th></th>
										<th>Итого по всем источникам:</th>
										<th>{String(totalCostOfAttractiveRes).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</th>
										<th></th>
										<th></th>
									</tr>
				</tbody>
		</table>
		</Fragment>
	);
}

export default CountCostOfResourcesTable;