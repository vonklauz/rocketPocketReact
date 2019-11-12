import React from 'react';

const FinPlanPageSelectWrapper = ({loadedObjects, onObjectChange, onVariantChange, onVariantDelete, onVariantCreate, parentState}) => (
	<div className="fin-plan__create-variant-menu">
		<select name="chosenObject" id="" className="app_input app_select" value={parentState.chosenObject} onChange={onObjectChange}>
			{Object.keys(loadedObjects).length ?
			<option key={'Выберите объект строительства'} value={false}>
				Выберите объект строительства
			</option>
				:
			<option key={'Нет сохранённых объектов'} value={false}>
				Нет сохранённых объектов
			</option>
			}
			{Object.keys(loadedObjects).map( key => (
			<option key={key} value={key}>{loadedObjects[key].general.name.value}</option>
			))
			}
		</select>
		{parentState.chosenObject ?
		<select name="chosenVariant" id="" className="app_input app_select" value={parentState.chosenVariant} onChange={onVariantChange}>
			{Object.keys(loadedObjects[parentState.chosenObject].variantsOfFinancing).length ?
			<option key={'Выберите вариант финансирования'} value={false}>
				Выберите вариант финансирования
			</option>
				:
			<option key={'Нет сохранённых вариантов финансирования'} value={false}>
				Нет сохранённых вариантов финансирования
			</option>
			}
			{parentState.chosenObject ? Object.keys(loadedObjects[parentState.chosenObject].variantsOfFinancing).map( key => (
				<option key={key} value={key}>{loadedObjects[parentState.chosenObject].variantsOfFinancing[key].name}</option>
			)) : null
			}
		</select> : null
		}
		{parentState.chosenObject ? <button className="app_button simple_button" onClick={onVariantCreate}>Задать новый вариант</button> : null}
		{parentState.chosenVariant ? <button className="app_button delete_button" onClick={onVariantDelete}>Удалить вариант</button> : null}
	</div>
);

export default FinPlanPageSelectWrapper;