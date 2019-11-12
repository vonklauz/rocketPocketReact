import { ADD_OBJECT, DELETE_OBJECT, UPDATE_OBJECT, LOAD_OBJECT} from '../constants';

const loadedObjects = (state = {}, {type, id, data}) => {
	switch (type) {
		case ADD_OBJECT:
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
			};

		default:
			return state
	}
}

export default loadedObjects;
