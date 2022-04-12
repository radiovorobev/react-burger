import React from 'react';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';

export default function BurgerConstructor({ data, handleOrderClick }) {
	return (
		<>
		<section className='styles.section mt-15 ml-10 pl-4'>
			<div className={`pl-8 mb-4`}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text='Краторная булка N-200i (верх)'
						price={123}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
					/>
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
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text='Краторная булка N-200i (верх)'
					price={123}
					thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
				/>
			</div>
			<div className={`${styles.totalPrice}`}>
				<span className={`text text_type_digits-medium mr-10`}>610&nbsp;<CurrencyIcon type="primary" /></span>
				<span onClick={() => handleOrderClick()} >
					<Button type="primary" size="medium">
						Оформить заказ
					</Button>
				</span>
			</div>
		</section>
	</>
	);
}

BurgerConstructor.propTypes = {
	handleOrderClick: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired
}