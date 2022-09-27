import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import { Link, useLocation } from 'react-router-dom';
import React, {FC} from 'react';


export const AppHeader: FC = () => {
	const active = { color: '#f2f2f3', icon: 'primary' };
	const inActive = { color: '#8585ad', icon: 'secondary' };

	const [constructor, setConstructor] = React.useState(inActive);
	const [order, setOrder] = React.useState(inActive);
	const [profile, setProfile] = React.useState(inActive);

	const location = useLocation();

	React.useEffect(() => {
		location.pathname === '/' ? setConstructor(active) : setConstructor(inActive);
		location.pathname === '/order' ? setOrder(active) : setOrder(inActive);
		location.pathname === '/profile' ? setProfile(active) : setProfile(inActive);
	}, [location]);

	return (
			<header className={`${styles.header} mb-10`}>
				<div className={`${styles.content} pt-4 pb-4`}>
					<nav className={`${styles.nav}`}>
						<ul className={`${styles.buttons}`}>
							<li className={`${styles.button} p-5 mr-2`}>
								<Link to='/'>
									<BurgerIcon type='primary'/>
									<span className='text text_type_main-default ml-2' style={{ color: constructor.color }}>Конструктор</span>
								</Link>
							</li>
							<li className={`${styles.button} p-5`}>
								<Link to='/feed'>
									<ListIcon type='secondary'/>
									<span className='text text_type_main-default ml-2' style={{ color: order.color }}>Лента заказов</span>
								</Link>
							</li>
						</ul>
					</nav>
					<Logo />
					<Link to='/profile' className={`${styles.button} ${styles.login} p-5`}>
						<ProfileIcon type='secondary'/>
						<span className='text text_type_main-default ml-2' style={{ color: profile.color }}>Личный кабинет</span>
					</Link>
				</div>
			</header>
	);
}