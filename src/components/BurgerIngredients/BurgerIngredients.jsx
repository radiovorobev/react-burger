import React from 'react';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {useDrag} from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import {INGREDIENT_MODAL} from "../../services/actions/actions";
export default function BurgerIngredients({handleIngredientClick}) {
	const [current, setCurrent] = React.useState('buns');


	const { ingredients, ingredientsInConstructor } = useSelector(store => store);
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

	//DnD
	//const [count, setCount] = React.useState(0);
	//const bun = ingredientsInConstructor.find(item => item.data.type === 'bun');


	/*React.useEffect(() => {
		if (isDrag && getItem.data._id === ingredients._id) {
			if (isDrop) {
				if (ingredients.type === 'bun' && count < 2) {
					setCount(count + 2);
				} else if (ingredients.type !== 'bun') {
					setCount(count + 1);
				}
			}
		} else if (ingredientsInConstructor.length <= 0 ||
			bun && ingredients.type === 'bun' && ingredients._id !== bun.data._id) {
			setCount(0);
		} else if (ingredients.type !== 'bun' && ingredientsInConstructor.length > 0) {
			let num = 0;
			ingredientsInConstructor.forEach(element => {
				if (element.data._id === ingredients._id) {
					num++;
				}
			});
			setCount(num);
		}
	}, [isDrag, isDrop, ingredientsInConstructor, bun]);*/

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