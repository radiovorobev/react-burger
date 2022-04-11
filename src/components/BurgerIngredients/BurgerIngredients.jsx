import React from 'react';
import styles from './BurgerIngredients.module.css';
import {Tab, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';

function BurgerIngredients(props) {
	const [current, setCurrent] = React.useState('one');
	const [isModal, setIsModal] = React.useState(false);
	const [ingredient, setIngredient] = React.useState(null);

	const handleClick = (item) => {
		setIngredient(item);
		setIsModal(true);
	}
	return (
		<>
		<section className={styles.section}>
			<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
			<div style={{ display: 'flex' }} className="mb-10">
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
			<div className={`${styles.ingredients}`}>
			<h2 className="text text_type_main-medium mb-6">Булки</h2>

					<ul className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
						{
							props.data.filter(item => item.type === 'bun').map((item) => (
							<React.Fragment key={item._id}>
								<li className={`${styles.card}`} onClick={() => { handleClick(item) }}>
									<img src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
									<span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
									<span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
								</li>
							</React.Fragment>
						))}
					</ul>
				<h2 className="text text_type_main-medium mb-6">Соусы</h2>
					<ul className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
						{
							props.data.filter(item => item.type === 'sauce').map((item) => (
								<React.Fragment key={item._id}>
									<li className={`${styles.card} mb-8`} onClick={() => { handleClick(item) }}>
										<img src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
										<span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
										<span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
									</li>
								</React.Fragment>
							))}
					</ul>
			<h2 className="text text_type_main-medium mb-6">Начинки</h2>
				<ul className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
					{
						props.data.filter(item => item.type === 'main').map((item) => (
							<React.Fragment key={item._id}>
								<li className={`${styles.card} mb-8`} onClick={() => { handleClick(item) }}>
									<img src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
									<span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type="primary" /></span>
									<span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
								</li>
							</React.Fragment>
							))}
				</ul>
				</div>
		</section>
	{isModal && <Modal onClose={setIsModal} title='Детали ингредиента'>
		<IngredientDetails ingredient={ingredient} />
	</Modal>}
	</>
	);
}

export default BurgerIngredients;