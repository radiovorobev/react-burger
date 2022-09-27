import styles from './RegPage.module.css';
import React, {FC, FormEvent} from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/types';
import { signIn } from '../../services/actions/auth';

export const RegPage:FC = () => {
	const dispatch = useDispatch();
	const [user, setUser] = React.useState({ name: '', email: '', password: '' });
	const { errorLogin } = useSelector(store => store.auth);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	}

	const handleSubmit = React.useCallback((event: FormEvent) => {
		event.preventDefault();
		dispatch(signIn(user, 'register'));
	}, [dispatch, user]);


	return (
		<>
			<main className={styles.container}>
				<h1 className="text text_type_main-medium mb-6">Регистрация</h1>
				{
					errorLogin && errorLogin === 'Ошибка: 403' &&
					<p className="text text_type_main-default mt-6 mb-6">Пользователь с такими данными уже существует</p> }
				{
					errorLogin && errorLogin !== 'Ошибка: 403' &&
					<p className="text text_type_main-default mt-6 mb-6">Что-то пошло не так</p>
				}
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
				<p className={`${styles.buttons} text text_type_main-default text_color_inactive`}>
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