import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import {Link} from "react-router-dom";

function AppHeader() {
	return (
			<header className={`${styles.header} mb-10`}>
				<div className={`${styles.content} pt-4 pb-4`}>
					<nav className={`${styles.nav}`}>
						<ul className={`${styles.buttons}`}>
							<li className={`${styles.button} p-5 mr-2`}>
								<BurgerIcon type='primary'/>
								<span className='text text_type_main-default ml-2'>Конструктор</span>
							</li>
							<li className={`${styles.button} p-5`}>
								<ListIcon type='secondary'/>
								<span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
							</li>
						</ul>
					</nav>
					<Logo />
					<Link to='/profile' className={`${styles.button} ${styles.login} p-5`}>
						<ProfileIcon type='secondary'/>
						<span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
					</Link>
				</div>
			</header>
	);
}

export default AppHeader;