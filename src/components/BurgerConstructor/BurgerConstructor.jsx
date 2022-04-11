import React from 'react';
import styles from './BurgerConstructor.module.css';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

function BurgerConstructor(props) {
	const [isModal, setIsModal] = React.useState(false);
	return (
		<>
		<section className='styles.section mt-15 ml-10 pl-4'>
			<div className={`pl-8 mb-4`}>
				<ConstructorElement
					type="top"
					isLocked={true}
					text={`${props.data[0].name} (верх)`}
					price={props.data[0].price}
					thumbnail={props.data[0].image}
				/>
			</div>
				<ul className={`${styles.list} ml-4`}>
					{props.data.map((ingredient) => {
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
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text={`${props.data[0].name} (низ)`}
					price={props.data[0].price}
					thumbnail={props.data[0].image}
				/>
			</div>
			<div className={`${styles.totalPrice}`}>
				<span className={`text text_type_digits-medium mr-10`}>610&nbsp;<CurrencyIcon type="primary" /></span>
				<span onClick={() => { setIsModal(true) }}>
					<Button type="primary" size="medium">
						Оформить заказ
					</Button>
				</span>
			</div>
		</section>
			{isModal && <Modal onClose={setIsModal}>
				<OrderDetails />
			</Modal>}
	</>
	);
}
export default BurgerConstructor;
