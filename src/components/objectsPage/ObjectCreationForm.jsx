import React from 'react';
import Input from '../commonComponents/Input';
import Button from '../commonComponents/Button';

const ObjectCreationForm = ({onInputChange, onButtonPress}) =>(
	<form action="" class="objects-page__form">
					<div class="objects-page__form__half">

						<div class="objects-page__form__input-wrapper">
							<label for="objectName">Название объекта<span class="required_to_fill">*</span> :</label>
							<Input className={"app_input objects-page__form__input"} id={"objectName"} onChange={this.getInputValue} value={this.state.objectName.value}/>
						</div>

						<div class="objects-page__form__input-wrapper">
							<label for="objectName">Сметная стоимость объекта<span class="required_to_fill">*</span> :</label>
							<Input className={"app_input objects-page__form__input"} id={"objectEstimate"} onChange={this.getInputValue} value={this.state.objectName.value}/>
						</div>

						<div class="objects-page__form__input-wrapper">
							<label for="objectName">Объём м<sup>2</sup> к реализации<span class="required_to_fill">*</span> :</label>
							<input type="text" class="app_input objects-page__form__input" id="objectArea"/>
						</div>

						<ul class="objects-page__form__estate-types-list">
							<p>В том числе (м<sup>2</sup>)<span class="required_to_fill">*</span> :</p>
							<li class="objects-page__form__input-wrapper">
								<label for="objectName">Квартиры:</label>
								<input type="text" class="app_input objects-page__form__input" id="flatsSquare"/>
							</li>
							<li class="objects-page__form__input-wrapper">
								<label for="objectName">Офисы:</label>
								<input type="text" class="app_input objects-page__form__input" id="officesSquare"/>
							</li>
							<li class="objects-page__form__input-wrapper">
								<label for="objectName">Торговые площади:</label>
								<input type="text" class="app_input objects-page__form__input" id="tradeSquare"/>
							</li>
							<li class="objects-page__form__input-wrapper">
								<label for="objectName">Складские помещения:</label>
								<input type="text" class="app_input objects-page__form__input" id="storagesSquare"/>
							</li>
							<li class="objects-page__form__input-wrapper">
								<label for="objectName">Парковка:</label>
								<input type="text" class="app_input objects-page__form__input" id="parkingSquare"/>
							</li>
						</ul>
					</div>
					<div class="objects-page__form__half">
						<textarea name="" id="objectsPageTextArea" class="app_input" cols="30" rows="10" placeholder="Подробное описание объекта" maxlength={1000}></textarea>
						<small id="areaSmall">0/1000</small>
					</div>
				</form>
				<Button className={"app_button big_button light_blue_button"} id={"objectPassportNextStepButton"}>Далее</Button>
);