import React from 'react';
import styles from './ForgotPwdPage.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function forgotPassword(form) {
	return undefined;
}

function Navigate(props) {
	return null;
}

export function ForgotPwdPage () {
	const dispatch = useDispatch();
	//const forgot = useSelector(store => store.profile.forgot);
	let forgot;

	const [form, setValue] = React.useState({ email: '' });

	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	}

	const handleSubmit = React.useCallback(e => {
		e.preventDefault();
		dispatch(forgotPassword(form));
	}, [dispatch, form]);

	if (forgot) {
		return <Navigate to='/reset-password' replace={true} />
	}
	return (
			<main className={styles.container}>
				<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<div className={`${styles.form} mb-6`}>
						<Input
							type='email'
							name='email'
							placeholder='Укажите e-mail'
							size='default'
							onChange={onChange}
							value={form.email} />
					</div>
					<div>
						<Button type="primary" size="medium">Восстановить</Button>
					</div>
				</form>
				<p className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль?
					<Link to='/login'>
						<Button type="secondary" size="medium">
							Войти
						</Button>
					</Link>
				</p>
			</main>
	)
}