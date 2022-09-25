import styles from './FeedPage.module.css';
import React, { FC } from 'react';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/webSocket';
import { FeedElement } from '../../components/FeedElemenet/FeedElement';
import { Link, useLocation } from 'react-router-dom';
import { TOrder } from '../../utils/types';
import { useSelector, useDispatch } from '../../utils/types';

export const FeedPage: FC = () => {
	const dispatch = useDispatch();
	const { wsConnected, orders, error, total, totalToday } = useSelector(store => store.socket);
	const [pending, setPending] = React.useState<TOrder[] | null>(null);
	const [done, setDone] = React.useState<TOrder[] | null>(null);

	const location = useLocation();

	React.useEffect(() => {
		dispatch({ type: WS_CONNECTION_START, payload: '/all' });

		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		}
	}, [dispatch]);

	React.useEffect(() => {
		setDone(orders.filter(el => el.status === 'done'));
		setPending(orders.filter(el => el.status === 'pending'));
	}, [orders]);

	return (
		<>
			{!wsConnected && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Подключение</h1>}
			{error && <h1 style={{ color: '#f2f2f3' }} className='text text_type_main-large m-10'>Ошибка</h1>}
			{wsConnected && !error &&
				<main className={`${styles.main} pb-10`}>
					<h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
					<section className={styles.feed}>
						<ul className={`${styles.list}`}>
							{orders.map((item, index) => {
								return (
									<Link
										key={index}
										to={`/feed/${item.number}`}
										state={{ background: location }}
										className={styles.link}>
										<FeedElement data={item} />
									</Link>
								)
							})}
						</ul>
					</section>
					<section className={styles.info}>
						<div className={styles.status}>
							<div className={`${styles.statusList} mr-9`}>
								<p className='text text_type_main-medium mb-6'>Готовы:</p>
								<ul className={styles.orders}>
									{done?.map(el =>
										<li key={el._id}>
											<p
												className='text text_type_digits-default'
												style={{ color: '#00cccc' }}>
												{el.number}
											</p>
										</li>)}
								</ul>
							</div>
							<div className={styles.statusList}>
								<p className='text text_type_main-medium mb-6'>В работе:</p>
								<ul className={styles.orders}>
									{pending?.map(el =>
										<li key={el._id}>
											<p
												className='text text_type_digits-default'
												style={{ color: '#f2f2f3' }}>
												{el.number}
											</p>
										</li>)}
								</ul>
							</div>
						</div>
						<div>
							<p className='text text_type_main-medium'>Выполнено за все время:</p>
							<p className={`text text_type_digits-large ${styles.num}`}>{total}</p>
						</div>
						<div>
							<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
							<p className={`text text_type_digits-large ${styles.num}`}>{totalToday}</p>
						</div>
					</section>
				</main>
			}
		</>
	)
}
