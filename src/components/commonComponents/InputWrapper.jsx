import React from 'react';

const InputWrapper = ({wrappingTagClass, 
					   children=null, 
					   restChildren=null,
					   inputClass, 
					   inputName='', 
					   inputId='', 
					   inputValue, 
					   onChange=()=>{},  
					  dataAttrValue='',
					  disabled=false}) => (
	
	<div className={wrappingTagClass}>
		{children[0]}
		<input className={inputClass} 
		id={inputId} 
		name={inputName} 
		value={String(inputValue).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} 
		onChange={onChange} 
		data-type={dataAttrValue}
		disabled={disabled}></input>
		{children[1]}
	</div>
);

export default InputWrapper;