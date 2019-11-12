import React from 'react';

const ObjectsPageSelectWrapper = ({onChange, onCreate, onDelete, dataObj, parentState}) => (
	<div className="fin-plan__create-variant-menu">
	
		{parentState.isChosenObject ? <button className="app_button delete_button" onClick={onDelete}>Удалить вариант</button> : null}
		
		<select className={"app_input app_select"} onChange={onChange} value={parentState.isChosenObject}>
			{Object.keys(dataObj).length ? 
				<option key={'Выберите объект'} value={false}>Выберите объект</option>
				:
				<option key={'Нет сохранённых объектов'} value={false}>Нет сохранённых объектов</option>
			}
			{Object.keys(dataObj).map( key => (
			<option key={key} value={key}>{dataObj[key].general.name.value}</option>
			))
			}
		</select>
		
		<button className="app_button simple_button" onClick={onCreate}>Задать новый вариант</button>
	</div>
);

export default ObjectsPageSelectWrapper;