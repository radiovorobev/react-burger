import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useSelector } from 'react-redux';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

export default function BurgerIngredients({handleIngredientClick}) {
	const [current, setCurrent] = React.useState('buns');
	const { ingredients } = useSelector(store => store.ingredients);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setCurrent(entry.target.id);
				}
			});
		},
		{
			root: null,
			rootMargin: "-200px",
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
	}, [observer, bunsRef, saucesRef, mainRef]);

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
								<BurgerIngredient key={item._id} item={item} handleIngredientClick={handleIngredientClick}/>
						))}
					</ul>
				<h2 className='text text_type_main-medium mb-6'>Соусы</h2>
					<ul ref={saucesRef} id='sauces' className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
						{
							ingredients.filter(item => item.type === 'sauce').map((item) => (
								<BurgerIngredient key={item._id} item={item} handleIngredientClick={handleIngredientClick}/>
							))}
					</ul>
			<h2 className='text text_type_main-medium mb-6'>Начинки</h2>
				<ul ref={mainRef} id='main' className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
					{
						ingredients.filter(item => item.type === 'main').map((item) => (
							<BurgerIngredient key={item._id} item={item} handleIngredientClick={handleIngredientClick}/>
							))}
				</ul>
				</div>
		</section>
	</>
	);
}