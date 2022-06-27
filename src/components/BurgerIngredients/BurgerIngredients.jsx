import React from 'react';
import PropTypes from 'prop-types';
import {Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import {IngredientsContext} from '../../services/ingredientsContext.jsx';
import {useDispatch, useSelector} from "react-redux";
import {INGREDIENT_MODAL} from "../../services/actions/actions";

export default function BurgerIngredients({handleIngredientClick}) {
	const [current, setCurrent] = React.useState('buns')
	//const data = React.useContext(IngredientsContext);
	const [isIngredientModal, setIngredientModal] = React.useState(false);
	const { ingredients, currentIngredient } = useSelector(store => store);
	const dispatch = useDispatch();
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setCurrent(entry.target.id);
					console.log(entry.target.id);
				}
			});
		},
		{
			root: null,
			rootMargin: "0px",
			threshold: 0.2
		}
	);

	const bunsRef = React.useRef();
	const saucesRef = React.useRef();
	const mainRef = React.useRef();

	React.useEffect(() => {
		observer.observe(bunsRef.current);
		observer.observe(saucesRef.current);
		observer.observe(mainRef.current);

		return () => {
			observer.disconnect(bunsRef.current);
			observer.disconnect(saucesRef.current);
			observer.disconnect(mainRef.current);
		}
	}, [bunsRef, saucesRef, mainRef]);


	return (
		<>
		<section className={styles.section}>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<div className={`${styles.tabs} mb-10`}>
				<Tab value='buns' active={current === 'buns'} onClick={setCurrent}>
					<span>Булки</span>
				</Tab>
				<Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
					<span>Соусы</span>
				</Tab>
				<Tab value='main' active={current === 'main'} onClick={setCurrent}>
					<span>Начинки</span>
				</Tab>
			</div>
			<div className={`${styles.ingredients}`} >
			<h2 className='text text_type_main-medium mb-6'>Булки</h2>
					<ul ref={bunsRef} id='buns' className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
						{
							ingredients.filter(item => item.type === 'bun').map((item) => (
								<li key={item._id} className={`${styles.card}`} onClick={() => { handleIngredientClick(item) }}>
									<div className={`$styles.counter`}>
										<Counter count={1} size='default' />
									</div>
									<img alt={item.name} src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
									<span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type='primary' /></span>
									<span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
								</li>
						))}
					</ul>
				<h2 className='text text_type_main-medium mb-6'>Соусы</h2>
					<ul ref={saucesRef} id='sauces' className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
						{
							ingredients.filter(item => item.type === 'sauce').map((item) => (
								<React.Fragment key={item._id}>
									<li className={`${styles.card} mb-8`} onClick={() => { handleIngredientClick(item) }}>
										<img alt={item.name} src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
										<span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type='primary' /></span>
										<span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
									</li>
								</React.Fragment>
							))}
					</ul>
			<h2 className='text text_type_main-medium mb-6'>Начинки</h2>
				<ul ref={mainRef} id='main' className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
					{
						ingredients.filter(item => item.type === 'main').map((item) => (
							<React.Fragment key={item._id}>
								<li className={`${styles.card} mb-8`} onClick={() => { handleIngredientClick(item) }}>
									<img alt={item.name} src={item.image} className={`${styles.img} mb-1 ml-4 mr-4`}/>
									<span className={`${styles.price} text text_type_digits-default mb-1`}>{item.price}&nbsp;<CurrencyIcon type='primary' /></span>
									<span className={`${styles.center} text text_type_main-default`}>{item.name}</span>
								</li>
							</React.Fragment>
							))}
				</ul>
				</div>
		</section>
	</>
	);
}
