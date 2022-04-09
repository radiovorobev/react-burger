import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ingredientsStyles from './BurgerIngredients.module.css';
import {Tab, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients(props) {

	return (
		<section className={ingredientsStyles.section}>
			<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
			<div className={`${ingredientsStyles.tabs} mb-10`}>
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
			<div className={`${ingredientsStyles.ingredients}`}>
			<h2 className="text text_type_main-medium mb-6">Булки</h2>

					<ul className={`${ingredientsStyles.ingredient} pl-4 pr-4 mb-10`}>
						{
							props.data.filter(item => item.type === 'bun').map((item) => (
							<React.Fragment key={item._id}>
								<li className={`${ingredientsStyles.card}`}>
									<img src={item.image} alt={item.name} className={`${ingredientsStyles.img} mb-1 ml-4 mr-4`}/>
									<span className={`${ingredientsStyles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
									<span className={`${ingredientsStyles.center} text text_type_main-default`}>{item.name}</span>
								</li>
							</React.Fragment>
						))}
					</ul>
				<h2 className="text text_type_main-medium mb-6">Соусы</h2>
					<ul className={`${ingredientsStyles.ingredient} pl-4 pr-4 mb-10`}>
						{
							props.data.filter(item => item.type === 'sauce').map((item) => (
								<React.Fragment key={item._id}>
									<li className={`${ingredientsStyles.card} mb-8`}>
										<img src={item.image} alt={item.name} className={`${ingredientsStyles.img} mb-1 ml-4 mr-4`}/>
										<span className={`${ingredientsStyles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
										<span className={`${ingredientsStyles.center} text text_type_main-default`}>{item.name}</span>
									</li>
								</React.Fragment>
							))}
					</ul>
			<h2 className="text text_type_main-medium mb-6">Начинки</h2>
				<ul className={`${ingredientsStyles.ingredient} pl-4 pr-4 mb-10`}>
					{
						props.data.filter(item => item.type === 'main').map((item) => (
							<React.Fragment key={item._id}>
								<li className={`${ingredientsStyles.card} mb-8`}>
									<img src={item.image} alt={item.name} className={`${ingredientsStyles.img} mb-1 ml-4 mr-4`}/>
									<span className={`${ingredientsStyles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
									<span className={`${ingredientsStyles.center} text text_type_main-default`}>{item.name}</span>
								</li>
							</React.Fragment>
							))}
				</ul>
				</div>
		</section>
	);
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object)
};