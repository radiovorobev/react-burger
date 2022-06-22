import React from 'react';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import {IngredientsContext, OrderContext, TotalPriceContext} from "../../services/ingredientsContext";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { baseUrl } from '../../utils/data.jsx';
import {checkResponse} from "../../utils/utilities";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from '../../services/actions/actions';
export default function BurgerConstructor() {

	//const data = React.useContext(IngredientsContext);
	const { ingredients } = useSelector(store => store);

	const ingredientsInConstructor = ingredients;

	const {totalPrice, setTotalPrice} = React.useContext(TotalPriceContext);


	const bun = ingredientsInConstructor.find(element => element.type === 'bun');
	const ingredientsConstructor = ingredientsInConstructor.filter(element => element.type !== 'bun');




	//const items = ingredientsInConstructor.map(item => item._id);
	//const [order, setOrder] = React.useState(null);
	const [isOrderDetailsModal, setOrderDetailsModal] = React.useState(false);
	const dispatch = useDispatch();

	const handleClickOrder = React.useCallback(() => {
		const items = ingredientsInConstructor.map(item => item._id);
		//items.push(bun.data._id);
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
			setTotalPrice(total);
		},
		[ingredientsInConstructor, setTotalPrice]
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