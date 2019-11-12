import React from 'react';

import SetDateComponent from './SetDateComponent'

const SetPeriodsComponent = ({firstSelectValue, firstSelectName, firstInputValue, firstInputName, secondSelectValue, secondSelectName, secondInputValue, secondInputName, onChange, children}) => (
	<div className='chart-ui_wrapper'>
		{children[0]}
		<SetDateComponent selectValue={firstSelectValue} selectName={firstSelectName} onSelectChange={onChange} inputValue={firstInputValue} inputName={firstInputName} onInputChange={onChange}/>
		{children[1]}
		<SetDateComponent selectValue={secondSelectValue} selectName={secondSelectName} onSelectChange={onChange} inputValue={secondInputValue} inputName={secondInputName} onInputChange={onChange}/>
		{children[2]}
	</div>
);

export default SetPeriodsComponent;