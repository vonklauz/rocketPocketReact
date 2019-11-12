import React from 'react';

const AddCashComponent = ({chosenSource, selectName, onSelectChange, sum, inputName, onInputChange, inputId='', isSelectNeeded=true}) => (
	<div className='chart-ui_input-wrapper'>
		{isSelectNeeded? 
		<select className='app_input chart-ui_element chart-ui_select' value={chosenSource} name={selectName} onChange={onSelectChange}>
			<option key={Math.random()} value=''>Источник</option>
			<option key={Math.random()} value="ownFunds">Собственные средства</option>
			<option key={Math.random()} value="bankCredit">Кредит банка под залог</option>
			<option key={Math.random()} value="escrowCredit">Эскроу-кредит банка</option>
			<option key={Math.random()} value="investorA">Инвестор кат. "А"</option>
			<option key={Math.random()} value="investorB">Инвестор кат. "В"</option>
		</select> : null}
		<label htmlFor={inputName}>Сумма:</label>
		<input className='app_input chart-ui_element' value={String(sum).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} id={inputId} name={inputName} onChange={onInputChange} maxLength='20'></input>
	</div>
);

export default AddCashComponent;