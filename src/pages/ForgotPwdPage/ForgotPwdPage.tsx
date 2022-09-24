import React, {ChangeEvent, FC} from 'react';
import styles from './ForgotPwdPage.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/types';
import { forgotPwd } from '../../services/actions/auth';

export const ForgotPwdPage: FC = () => {
	const dispatch = useDispatch();
	const forgotPassword = useSelector(store => store.auth.forgotPassword);

	const [form, setValue] = React.useState({ email: '' });

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	}

	const handleSubmit = React.useCallback(e => {
		e.preventDefault();
		dispatch(forgotPwd(form));
	}, [dispatch, form]);

	if (forgotPassword) {
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
				<p className={`${styles.buttons} text text_type_main-default text_color_inactive`}>
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