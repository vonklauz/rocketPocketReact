import { ADD_OBJECT, DELETE_OBJECT, UPDATE_OBJECT, LOAD_OBJECT } from '../constants';

export const addObject = (id, data) => ({
	type: ADD_OBJECT,
	id,
	data,
});

export const deleteObject = id => ({
	type: DELETE_OBJECT,
	id,
});

export const updateObject = (id, data) => ({
	type: UPDATE_OBJECT,
	id,
	data,
});

export const loadObjects = data => ({
	type: LOAD_OBJECT,
	data
});