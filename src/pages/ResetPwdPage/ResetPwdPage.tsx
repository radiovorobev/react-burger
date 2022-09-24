import React, {FC} from 'react';
import styles from './ResetPwdPage.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/types';
import { resetPwd } from '../../services/actions/auth';

export const ResetPwdPage:FC = () => {
	const dispatch = useDispatch();
	const { forgotPassword, resetPassword, errorPwd } = useSelector(store => store.auth);

	const [form, setValue] = React.useState({ password: '', token: '' });

	const onChange = (event: { target: { name: string; value: string; }; }) => {
		setValue({ ...form, [event.target.name]: event.target.value });
	}

	const handleSubmit = React.useCallback(event => {
		event.preventDefault();
		dispatch(resetPwd(form));
	}, [dispatch, form]);

	if (resetPassword) {
		return <Navigate to='/login' replace={true} />
	} else if (!forgotPassword) {
		return <Navigate to='/forgot-password' replace={true} />
	}
	return (
			<main className={styles.container}>
				<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
				{
					errorPwd && errorPwd === 'Ошибка: 404' &&
					<p className="text text_type_main-default mt-6 mb-6">Проверьте правильность кода из письма</p> }
				{
					errorPwd && errorPwd !== 'Ошибка: 404' &&
					<p className="text text_type_main-default mt-6 mb-6">Что-то пошло не так</p>
				}
				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<div className={`${styles.input} mb-6`}>
						<Input type='password'
						       name="password"
						       placeholder='Введите новый пароль'
						       icon='ShowIcon'
						       size="default"
						       onChange={onChange}
						       value={form.password} />
					</div>
					<div className={`${styles.input} mb-6`}>
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
				<p className={`${styles.buttons} text text_type_main-default text_color_inactive`}>
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