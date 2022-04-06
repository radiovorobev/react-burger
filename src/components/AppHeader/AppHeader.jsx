import headerStyles from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
	return (
			<header className={`${headerStyles.header} mb-10`}>
				<div className={`${headerStyles.content} pt-4 pb-4`}>
					<nav className={`${headerStyles.nav}`}>
						<ul className={`${headerStyles.buttons}`}>
							<li className={`${headerStyles.button} p-5 mr-2`}>
								<BurgerIcon type="primary"/>
								<span className="text text_type_main-default ml-2">Конструктор</span>
							</li>
							<li className={`${headerStyles.button} p-5`}>
								<ListIcon type="secondary"/>
								<span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
							</li>
						</ul>
					</nav>
					<Logo />
					<div className={`${headerStyles.button} ${headerStyles.login} p-5`}>
						<ProfileIcon type="secondary"/>
						<span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
					</div>
				</div>
			</header>
	);
}

export default AppHeader;
