import React from 'react';

const Button = ({className='app_button', id='', onClick, children}) => (
	<button type="button" className={className} id={id} onClick={onClick}>{children}</button>
);

export default Button;