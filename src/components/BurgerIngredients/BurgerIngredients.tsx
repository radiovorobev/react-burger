import React, {FC} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useSelector } from '../../utils/types'
import {BurgerIngredient} from '../BurgerIngredient/BurgerIngredient';
import { Link, useLocation } from 'react-router-dom';

export const BurgerIngredients: FC = () => {
	const [current, setCurrent] = React.useState('buns');
	const { ingredients } = useSelector(store => store.ingredients);
	const location = useLocation();
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

	const bunsRef = React.useRef<HTMLUListElement>(null);
	const saucesRef = React.useRef<HTMLUListElement>(null);
	const mainRef = React.useRef<HTMLUListElement>(null);

	React.useEffect(() => {
		if (bunsRef.current && saucesRef.current && mainRef.current) {
		observer.observe(bunsRef.current);
		observer.observe(saucesRef.current);
		observer.observe(mainRef.current);
			}

		return () => {
			observer.disconnect();
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
								<Link
									className={styles.link}
									to={`/ingredients/${item._id}`}
									state={{ background: location }}
									key={item._id} >
									<BurgerIngredient item={item} id={item._id} />
								</Link>
						))}
					</ul>
				<h2 className='text text_type_main-medium mb-6'>Соусы</h2>
					<ul ref={saucesRef} id='sauces' className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
						{
							ingredients.filter(item => item.type === 'sauce').map((item) => (
								<Link
									className={styles.link}
									to={`/ingredients/${item._id}`}
									state={{ background: location }}
									key={item._id} >
									<BurgerIngredient item={item} id={item._id} />
								</Link>
							))}
					</ul>
			<h2 className='text text_type_main-medium mb-6'>Начинки</h2>
				<ul ref={mainRef} id='main' className={`${styles.ingredient} pl-4 pr-4 mb-10`}>
					{
						ingredients.filter(item => item.type === 'main').map((item) => (
							<Link
								className={styles.link}
								to={`/ingredients/${item._id}`}
								state={{ background: location }}
								key={item._id} >
								<BurgerIngredient item={item}  id={item._id}/>
							</Link>
							))}
				</ul>
				</div>
		</section>
	</>
	);
}