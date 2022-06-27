import React from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, SET_TOTAL_PRICE } from '../../services/actions/actions';
export default function BurgerConstructor() {

	const { ingredients, totalPrice } = useSelector(store => store);
	const ingredientsInConstructor = ingredients;
	const bun = ingredientsInConstructor.find(element => element.type === 'bun');
	const ingredientsConstructor = ingredientsInConstructor.filter(element => element.type !== 'bun');
	const [isOrderDetailsModal, setOrderDetailsModal] = React.useState(false);
	const dispatch = useDispatch();

	const handleClickOrder = React.useCallback(() => {
		const items = ingredientsInConstructor.map(item => item._id);
		dispatch(getOrder(items));
		setOrderDetailsModal(true);
	}, [dispatch, ingredientsInConstructor]);

	React.useEffect(
		() => {
			let total = 0;
			ingredientsConstructor.map(ingredient => total += ingredient.price);
			if (bun) {
				total = total + bun.price*2;
			}
			dispatch({ type: SET_TOTAL_PRICE, totalPrice: total });
		},
		[ingredientsInConstructor]
	);

	return (
		<>

		<section className='styles.section mt-15 ml-10 pl-4'>
			<div className={`pl-8 mb-4`}>
				{ bun &&	<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/> }
			</div>
				<ul className={`${styles.list} ml-4`}>
					{ingredientsConstructor.map((ingredient) => {
						if (ingredient.type !== 'bun') {
							return (
								<React.Fragment key={ingredient._id}>
									<li className={`${styles.listItem} mb-4`}>
										<DragIcon type='primary' />
										<ConstructorElement
											text={ingredient.name}
											price={ingredient.price}
											thumbnail={ingredient.image}
										/>
									</li>
								</React.Fragment>
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
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
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