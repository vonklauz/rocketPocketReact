import React from 'react';

const SetDateComponent = ({selectValue, selectName, onSelectChange, inputValue, inputName, onInputChange,}) => (
	<div className='chart-ui_input-wrapper'>
		<select className='app_input chart-ui_element chart-ui_select' value={selectValue} name={selectName} onChange={onSelectChange}>
			<option key={'selectHeader'} value=''>Месяц</option>
			<option key={Math.random()} value="Январь">Январь</option>
			<option key={Math.random()} value="Февраль">Февраль</option>
			<option key={Math.random()} value="Март">Март</option>
			<option key={Math.random()} value="Апрель">Апрель</option>
			<option key={Math.random()} value="Май">Май</option>
			<option key={Math.random()} value="Июнь">Июнь</option>
			<option key={Math.random()} value="Июль">Июль</option>
			<option key={Math.random()} value="Август">Август</option>
			<option key={Math.random()} value="Сентябрь">Сентябрь</option>
			<option key={Math.random()} value="Октябрь">Октябрь</option>
			<option key={Math.random()} value="Ноябрь">Ноябрь</option>
			<option key={Math.random()} value="Декабрь">Декабрь</option>
		</select>
		<label htmlFor={inputName}>Год: 20</label>
		<input className='app_input chart-ui_element chart-ui_small-input' value={inputValue} id={inputName} name={inputName} onChange={onInputChange} maxLength='2'></input>
	</div>
);

export default SetDateComponent;