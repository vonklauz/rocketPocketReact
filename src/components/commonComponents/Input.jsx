import React from 'react';

const Input = ({className='app_input', id='', value, onChange, disabled=false, name='', dataType='', pattern=true}) => (
	<input type="text" className={className} id={id} value={pattern ? String(value).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : value} onChange={onChange} disabled={disabled} name={name} data-type={dataType}/>
);

export default Input;