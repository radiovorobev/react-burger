import styles from '../LoginPage/LoginPage.module.css';

export function Page404() {
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