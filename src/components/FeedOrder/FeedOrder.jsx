import React from "react";
import { getDate } from "../../utils/utilities";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentOrder } from "../../services/actions/burgers";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './FeedOrder.module.css';

export default function FeedOrderDetails() {
	const allIngredients = useSelector(store => store.ingredients.ingredients);
	const { currentOrder, currentOrderRequest, currentOrderFailed } = useSelector(store => store.inConstructor);

	const [dataIngredients, setIngredients] = React.useState([]);
	const [total, setTotal] = React.useState(0);

	const dispatch = useDispatch();
	const { id } = useParams();

	React.useEffect(() => {
		if (!currentOrder) {
			dispatch(getCurrentOrder(id));
		}
	}, [currentOrder]);

	React.useEffect(() => {
		if (dataIngredients.length <= 0 && currentOrder && allIngredients.length > 0) {
			const ingredients = currentOrder.ingredients.reduce((acc, val) => {
				let ingredient = allIngredients.find(el => el._id === val);
				acc[val] = { ...ingredient, count: (acc[val]?.count || 0) + 1 }
				return acc
			}, {})

			setIngredients(Object.values(ingredients));
		} else if (dataIngredients.length > 0) {
			const sum = dataIngredients.reduce((sum, curr) => { return sum + curr.price * curr.count }, 0);
			setTotal(sum);
		}
	}, [currentOrder, allIngredients, dataIngredients]);

	const status = { created: 'Создан', pending: 'Готовится', done: 'Выполнен' };

	return (
		<>
			{currentOrderRequest && <p>Загрузка...</p>}
			{currentOrderFailed && <p>Ошибка...</p>}
			{!currentOrderFailed && !currentOrderRequest && currentOrder && dataIngredients.length > 0 &&
				<div className={`${styles.container} p-8`}>
					<p className={`text text_type_digits-default mb-10 ${styles.text} ${styles.number}`}>
						{`#${currentOrder.number}`}
					</p>
					<p className={`text text_type_main-medium mb-3 ${styles.text}`}>
						{currentOrder.name}
					</p>
					<p className={`text text_type_main-default mb-15 ${styles.text}`}
					   style={{ color: currentOrder.status === 'done' ? '#00cccc' : '#f2f2f3' }}>
						{status[currentOrder.status]}
					</p>
					<p className={`text text_type_main-medium mb-6 ${styles.text}`}>
						Состав:
					</p>
					<ul className={`${styles.list} mb-10`}>
						{dataIngredients.map(el =>
							<li key={el._id} className={`${styles.item} mr-4`}>
								<div className={styles.name}>
									<img src={el.image_mobile} alt={el.name} className={styles.image} />
									<p className={`text text_type_main-default`}>
										{el.name}
									</p>
								</div>
								<span className={`text text_type_digits-default ${styles.span}`}>
                                    {`${el.count} x ${el.price}`}
									<CurrencyIcon type="primary" />
                                </span>
							</li>)}
					</ul>
					<div className={`${styles.block} mt-10`}>
						<p className="text text_type_main-default text_color_inactive">
							{getDate(currentOrder.createdAt)}
						</p>
						<span className={`text text_type_digits-default ${styles.span}`}>
                            {total}
							<CurrencyIcon type="primary" />
                        </span>
					</div>
				</div>}
		</>
	)
}