import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
	GET_INGREDIENTS_IN_CONSTRUCTOR,
	getOrder,
	SET_TOTAL_PRICE
} from '../../services/actions/burgers';
import { useDrop } from 'react-dnd';
import IngredientInConstructor from '../IngredientInConstructor/IngredientInConstructor';

export default function BurgerConstructor() {
	const { ingredientsInConstructor, totalPrice } = useSelector(store => store.inConstructor);
	const bun = ingredientsInConstructor.find(element => element.item.type === 'bun');
	const ingredientsConstructor = ingredientsInConstructor.filter(element => element.type !== 'bun');
	const [isOrderDetailsModal, setOrderDetailsModal] = React.useState(false);
	const dispatch = useDispatch();

	const handleClickOrder = React.useCallback(() => {
		const items = ingredientsInConstructor.map(ingredient => ingredient.item._id).concat(bun.item._id);
		dispatch(getOrder(items));
		setOrderDetailsModal(true);
	}, [dispatch, ingredientsInConstructor]);

	React.useEffect(
		() => {
			let total = 0;
			ingredientsConstructor.map(ingredient => total += ingredient.item.price);
			if (bun) {
				total = total + bun.item.price*2;
			}
			dispatch({ type: SET_TOTAL_PRICE, totalPrice: total });
		},
		[ingredientsInConstructor]
	);

	const handleDrop = (item) => {
		if (item.item.type === 'bun' && ingredientsInConstructor.find(item => item.item.type === 'bun')) {
			const buns = ingredientsInConstructor.find(item => item.item.type === 'bun');
			const array = [...ingredientsInConstructor];
			array.splice(buns, 1, item);
			dispatch({type: GET_INGREDIENTS_IN_CONSTRUCTOR, ingredient: array});
		} else {
			dispatch({type: GET_INGREDIENTS_IN_CONSTRUCTOR, ingredient: [...ingredientsInConstructor, item]});
		}
	}

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(item) {
			handleDrop(item);
		}
	});

	return (
		<>
		<section className='styles.section mt-15 ml-10 pl-4' ref={dropTarget}>
			{ingredientsInConstructor.length <= 0 &&
				<p className={`${styles.emptyContainer} text text_type_main-medium pt-30 pb-30 pl-10 pr-10`}>
					Добавьте булку и начинку вашего бургера.
				</p>}
			<div className={`pl-8 mb-4`}>
				{ bun &&	<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.item.name} (верх)`}
						price={bun.item.price}
						thumbnail={bun.item.image}
					/> }
			</div>
				<ul className={`${styles.list} ml-4`}>
					{ingredientsConstructor.map((ingredient, index) => {
						if (ingredient.item.type !== 'bun') {
							return (
								<IngredientInConstructor ingredient={ingredient} key={ingredient.id} index={index} />
							)
						} else {
							return null
						}
					})}
				</ul>
			<div className={`pl-8 mb-10 mt-4`}>
				{ bun &&	<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${bun.item.name} (низ)`}
					price={bun.item.price}
					thumbnail={bun.item.image}
				/> }
			</div>
			<div className={`${styles.totalPrice}`}>
				<span className={`text text_type_digits-medium mr-10`}>{totalPrice}&nbsp;<CurrencyIcon type="primary" /></span>
				<span onClick={handleClickOrder} >
					<Button type="primary" size="medium">
						Оформить заказ
					</Button>
				</span>
			</div>
		</section>

			{isOrderDetailsModal && <Modal onClose={setOrderDetailsModal}>
					<OrderDetails />
			</Modal> }
	</>
	);
}