import React from 'react';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import {IngredientsContext, OrderContext, TotalPriceContext} from "../../services/ingredientsContext";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { baseUrl } from '../../utils/data.jsx';
import {checkResponse} from "../../utils/utilities";

export default function BurgerConstructor() {

	const data = React.useContext(IngredientsContext);
	const {totalPrice, setTotalPrice} = React.useContext(TotalPriceContext);
	const bun = data.find(element => element.type === 'bun');
	const ingredients = data.filter(element => element.type !== 'bun');

	const items = ingredients.map(item => item._id);
	const [order, setOrder] = React.useState(null);
	const [isOrderDetailsModal, setOrderDetailsModal] = React.useState(false);
	const handleClickOrder = () => {
		setOrderDetailsModal(true);
	}

	function getOrder() {
		fetch(`${baseUrl}/orders`, {
			method: "POST",
			body: JSON.stringify({
				ingredients: items,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(checkResponse)
			.then((res) => {
				setOrder(res.order.number);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	React.useEffect(
		() => {
			let total = 0;
			ingredients.map(ingredient => total += ingredient.price);
			if (bun) {
				total = total + bun.price*2;
			}
			setTotalPrice(total);
		},
		[ingredients, setTotalPrice]
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
					{data.map((ingredient) => {
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
				<span onClick={() => handleClickOrder()} >
					<Button onClick={getOrder} type="primary" size="medium">
						Оформить заказ
					</Button>
				</span>
			</div>
		</section>

			{isOrderDetailsModal && <Modal onClose={setOrderDetailsModal}>
				<OrderContext.Provider value={ order }>
					<OrderDetails />
				</OrderContext.Provider>
			</Modal> }
	</>
	);
}