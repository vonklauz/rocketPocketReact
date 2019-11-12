import React from 'react';
import InputWrapper from '../commonComponents/InputWrapper';

const ObjectPageInputWrapper = ({children, 
								 inputValue, 
								 inputId='', 
								 onChange, 
								 disabled=false, 
								 isFilled, 
								 name='', 
								 dataType=''}) => (
	
	<InputWrapper
	wrappingTagClass={'objects-page__form__input-wrapper'} 
	inputClass={'app_input objects-page__form__input'} 
	inputId={inputId} 
	inputValue={inputValue} 
	onChange={onChange} 
	disabled={disabled} 
	inputName={name} 
	dataAttrValue={dataType}>
		{children}
		{isFilled? null : <small className="required_to_fill">Данное поле обязательно к заполнению</small>}
	</InputWrapper>
);

export default ObjectPageInputWrapper;