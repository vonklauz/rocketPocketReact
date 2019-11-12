import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
	<header className="shadow">
		<nav className="hamburger-menu">
			<input id="menu__toggle" type="checkbox" />
			<label className="menu__btn" htmlFor="menu__toggle">
				<span></span>
			</label>
			<ul className="menu__box">
				<li><NavLink activeClassName={'chosen_menu_point'} className="menu__item" exact to="/">Объекты</NavLink></li>
				<li><NavLink activeClassName={'chosen_menu_point'} className="menu__item" to="/financial_plan">Финансовый план</NavLink></li>
				<li><NavLink activeClassName={'chosen_menu_point'} className="menu__item" to="/charts_consolidation">Консолидация</NavLink></li>
				<li><NavLink activeClassName={'chosen_menu_point'} className="menu__item" to="/under_construction">Модель продаж</NavLink></li>
			</ul>
		</nav>
		<NavLink to="/" className="header__logo">
			<img src="./img/Logo.svg" alt="RocketPocket by IT-Finance Instrument"/>
		</NavLink>
		<nav className="header__menu">
			<ul className="header__menu__list">
				<li><NavLink activeClassName={'chosen_menu_point'} exact to="/" className="header__menu__list__point">Объекты</NavLink></li>
				<li><NavLink activeClassName={'chosen_menu_point'} to="/financial_plan" className="header__menu__list__point">Финансовый план</NavLink></li>
				<li><NavLink activeClassName={'chosen_menu_point'} to="/charts_consolidation" className="header__menu__list__point">Консолидация</NavLink></li>
				<li><NavLink activeClassName={'chosen_menu_point'} to="/under_construction" className="header__menu__list__point">Модель продаж</NavLink></li>
			</ul>
		</nav>
	</header>
);

export default Header;