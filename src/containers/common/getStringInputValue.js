export const getStringInputValue = e => {
		
		const statePropName = e.target.name;
		const updateGeneral = {...this.state.general};
		
		if (statePropName === 'name') {
			
			updateGeneral[statePropName].value = String(e.target.value);
			updateGeneral[statePropName].isFilled = e.target.value ? true : false
		}
		
		else {
			updateGeneral[statePropName] = String(e.target.value);
		}
		
		this.setState ({
				general: {...updateGeneral}
			});
	};