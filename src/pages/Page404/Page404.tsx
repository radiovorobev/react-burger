import styles from '../LoginPage/LoginPage.module.css';
import {FC} from "react";

export const Page404: FC = () => {
	return (
		<>
			<main className={styles.container}>
				<h1 className='text text_type_main-medium'>
					Страница не найдена
				</h1>
		</main>
		</>
	)
}