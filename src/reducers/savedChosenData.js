import {REMEMBER_CHOSEN_DATA} from '../constants';

const savedChosenData = (state = {}, {type, id}) => {
	switch (type) {
		case REMEMBER_CHOSEN_DATA:
			localStorage.setItem('chosenData', JSON.stringify([type] : [id]));
		/*case ADD_OBJECT:
		case UPDATE_OBJECT:
			localStorage.setItem('savedState', JSON.stringify({...state, [id]: data}));
			return {
				...state,
				[id]: data
			};
			
		case DELETE_OBJECT:
			let updateState = {...state};
			delete updateState[id];
			localStorage.setItem('savedState', JSON.stringify({...updateState}))
			return {
				...updateState
			};
				
		case LOAD_OBJECT:
			return {
				...data
			};*/

		default:
			return state
	}
}

export default savedChosenData;
