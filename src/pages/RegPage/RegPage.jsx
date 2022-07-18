import styles from './RegPage.module.css';
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../services/actions/auth';

export function RegPage() {
	const dispatch = useDispatch();
	const [user, setUser] = React.useState({ name: '', email: '', password: '' });

	const onChange = event => {
		setUser({ ...user, [event.target.name]: event.target.value });
	}

	const handleSubmit = React.useCallback(event => {
		event.preventDefault();
		dispatch(signIn(user, 'register'));
	}, [dispatch, user]);
	return (
		<>
			<main className={styles.container}>
				<h1 className="text text_type_main-medium mb-6">Регистрация</h1>
				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<div className={`${styles.input} mb-6`}>
						<Input type='text'
						       placeholder='Имя'
						       size='default'
						       name='name'
						       onChange={onChange}
						       value={user.name} />
					</div>
					<div className={`${styles.input} mb-6`}>
						<Input type='email'
						       placeholder='E-mail'
						       size='default'
						       name='email'
						       onChange={onChange}
						       value={user.email} />
					</div>
					<div className={`${styles.input} mb-6`}>
						<Input type='password'
						       placeholder='Пароль'
						       icon='ShowIcon'
						       size='default'
						       name='password'
						       onChange={onChange}
						       value={user.password} />
					</div>
					<div>
						<Button type="primary" size="medium">Зарегистрироваться</Button>
					</div>
				</form>
				<p className='text text_type_main-default text_color_inactive'>
					Уже зарегистрированы?
					<Link to='/login'>
						<Button type="secondary" size="medium">
							Войти
						</Button>
					</Link>
				</p>
			</main>
		</>
	)
}