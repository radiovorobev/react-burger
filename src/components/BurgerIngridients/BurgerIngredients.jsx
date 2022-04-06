import React from 'react';
import ingredientsStyles from './BurgerIngredients.module.css';
import {Tab, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../../utils/data.js";

function BurgerIngredients(props) {

	return (
		<section className={ingredientsStyles.section}>
			<div style={{ display: 'flex' }} mb-10>
				<Tab>
					<span>Булки</span>
				</Tab>
				<Tab>
					<span>Соусы</span>
				</Tab>
				<Tab>
					<span>Начинки</span>
				</Tab>
			</div>
			<h2 className="mb-6">Булки</h2>
				<ul className={`${ingredientsStyles.ingredients}`}>
					{
						data.filter(item => item.type === 'bun').map((item) => (
						<React.Fragment key={item._id}>
							<li className={`${ingredientsStyles.card} pl-4 pr-4`}>
								<img src={item.image} className="mb-1"/>
								<span className={`${ingredientsStyles.center} text text_type_digits-medium mb-1`}>{item.price}<CurrencyIcon type="primary" /></span>
								<span className={`${ingredientsStyles.center} text text_type_main-default`}>{item.name}</span>
							</li>
						</React.Fragment>
					))}
				</ul>
			<h2 className="mb-6">Соусы</h2>
				<ul className={`${ingredientsStyles.ingredients}`}>
					{
						data.filter(item => item.type === 'sauce').map((item) => (
							<React.Fragment key={item._id}>
								<li className={`${ingredientsStyles.card} pl-4 pr-4`}>
									<img src={item.image} className="mb-1"/>
									<span className={`${ingredientsStyles.center} text text_type_digits-medium mb-1`}>{item.price}<CurrencyIcon type="primary" /></span>
									<span className={`${ingredientsStyles.center} text text_type_main-default`}>{item.name}</span>
								</li>
							</React.Fragment>
						))}
				</ul>
			<h2 className="mb-6">Начинки</h2>
				<ul className={`${ingredientsStyles.ingredients}`}>
					{
						data.filter(item => item.type === 'main').map((item) => (
							<React.Fragment key={item._id}>
								<li className={`${ingredientsStyles.card} pl-4 pr-4`}>
									<img src={item.image} className="mb-1"/>
									<span className={`${ingredientsStyles.center} text text_type_digits-medium mb-1`}>{item.price}<CurrencyIcon type="primary" /></span>
									<span className={`${ingredientsStyles.center} text text_type_main-default`}>{item.name}</span>
								</li>
							</React.Fragment>
						))}
				</ul>
		</section>
	);
}

export default BurgerIngredients;