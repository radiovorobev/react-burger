import styles from './LoginPage.module.css';
import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../services/actions/auth';

export function LoginPage () {
	const [form, setValue] = React.useState({ email: '', password: '' });
	const dispatch = useDispatch();
	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	}

	const handleSignIn = React.useCallback(e => {
		e.preventDefault();
		dispatch(signIn(form, 'login'))
	}, [dispatch, form]);

	return (
			<main className={styles.container}>
				<h1 className="text text_type_main-medium mb-6">Вход</h1>
				<form className={`${styles.form} mb-20`} onSubmit={handleSignIn}>
					<div className={`${styles.input} mb-6`}>
						<Input type='email'
						       name='email'
						       onChange={onChange}
						       placeholder='E-mail'
						       size='default'
						       value={form.email} />
					</div>
					<div className={`${styles.input} mb-6`}>
						<Input
							type='password'
							name='password'
							onChange={onChange}
							placeholder='Пароль'
							icon='ShowIcon'
							size='default'
							value={form.password} />
					</div>
						<Button type='primary' size='medium'>Войти</Button>
				</form>
					<p className={`${styles.buttons} text text_type_main-default text_color_inactive`}>
						Вы - новый пользователь?
						<Link to='/register'>
							<Button type='secondary' size='medium'>
								Зарегистрироваться
							</Button>
						</Link>
					</p>
				<p className={`${styles.buttons} text text_type_main-default text_color_inactive`}>
					Забыли пароль?
					<Link to='/forgot-password'>
						<Button type='secondary' size='medium'>
							Восстановить пароль
						</Button>
					</Link>
				</p>
			</main>
	)
}