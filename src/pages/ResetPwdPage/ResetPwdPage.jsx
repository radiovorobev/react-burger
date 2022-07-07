import React from 'react';
import styles from './ResetPwdPage.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function resetPassword(form) {
	return undefined;
}

export function ResetPwdPage () {
	const dispatch = useDispatch();
	const { forgot, reset } = useSelector(store => store.profile);

	const [form, setValue] = React.useState({ password: '', token: '' });

	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	}

	const handleSubmit = React.useCallback(e => {
		e.preventDefault();
		dispatch(resetPassword(form));
	}, [dispatch, form]);

	if (reset) {
		return <Navigate to='/login' replace={true} />
	} else if (!forgot) {
		return <Navigate to='/forgot-password' replace={true} />
	}
	return (
			<main className={styles.container}>
				<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<div className={styles.input}>
						<Input type='password'
						       name="password"
						       placeholder='Введите новый пароль'
						       icon='ShowIcon'
						       size="default"
						       onChange={onChange}
						       value={form.password} />
					</div>
					<div className={styles.input}>
						<Input type='text'
						       name="token"
						       placeholder='Введите код из письма'
						       size="default"
						       onChange={onChange}
						       value={form.token} />
					</div>
					<div>
						<Button type="primary" size="medium">Сохранить</Button>
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
			</main >
	)
}