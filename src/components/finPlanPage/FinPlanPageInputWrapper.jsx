import React from 'react';
import InputWrapper from '../commonComponents/InputWrapper';

const FinPlanPageInputWrapper = ({children, inputValue, inputId='', onChange, disabled=false, inputName, dataType='', percent, isDisabled=false}) => (
	<InputWrapper 
	wrappingTagClass={'create-variant-form__input-wrapper'} 
	inputClass={'app_input'} 
	inputId={inputId}
	inputValue={inputValue}
	inputName={inputName}
	onChange={onChange}
	dataAttrValue={dataType}
	disabled={isDisabled}>
		{children}
		<small className='percents-of-totalValue'>{percent}% от общего объёма</small>
	</InputWrapper>
);

export default FinPlanPageInputWrapper;