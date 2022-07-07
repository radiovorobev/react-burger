import styles from './RegPage.module.css';
import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function login(form, register) {
	return undefined;
}

export function RegPage() {
	const dispatch = useDispatch();

	const [form, setValue] = React.useState({ name: '', email: '', password: '' });

	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	}

	const handleSubmit = React.useCallback(e => {
		e.preventDefault();
		dispatch(login(form, 'register'));
	}, [dispatch, form]);
	return (
		<>
			<main className={styles.container}>
				<h1 className="text text_type_main-medium mb-6">Регистрация</h1>
				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<div className={`${styles.input} mb-6`}>
						<Input type='text'
						       placeholder='Имя'
						       size="default"
						       name='name'
						       onChange={onChange}
						       value={form.name} />
					</div>
					<div className={`${styles.input} mb-6`}>
						<Input type='email'
						       placeholder='E-mail'
						       size="default"
						       name='email'
						       onChange={onChange}
						       value={form.email} />
					</div>
					<div className={`${styles.input} mb-6`}>
						<Input type='password'
						       placeholder='Пароль'
						       icon='ShowIcon'
						       size="default"
						       name='password'
						       onChange={onChange}
						       value={form.password} />
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
			</main >
		</>
	)
}