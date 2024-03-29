import styles from './ProfilePage.module.css';
import React, { ChangeEvent, FC, FocusEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector} from '../../utils/types';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { signOut, updateUser } from '../../services/actions/auth';

export const ProfilePage: FC = () => {
	const nameRef = React.useRef<HTMLInputElement>(null);
	const mailRef = React.useRef<HTMLInputElement>(null);
	const pwdRef = React.useRef<HTMLInputElement>(null);

	const { user } = useSelector(store => store.auth);
	const dispatch = useDispatch();
	interface IInputs {
		disabled: boolean,
		icon: 'CloseIcon' | 'EditIcon'
	}
	const active:IInputs = { disabled: false, icon: 'CloseIcon' };
	const inactive:IInputs = { disabled: true, icon: 'EditIcon' };

	const [inputs, setInputs] = React.useState({ name: inactive, email: inactive, password: inactive });
	const [form, setForm] = React.useState({ ...user, password: '' });
	const [disabledInputs, setDisabledInputs] = React.useState(true);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	const handleClick = () => {
		dispatch(signOut(localStorage.getItem('token')));
	}

	const handleIcon = (inputRef: React.RefObject<HTMLInputElement>) => {
		if (inputRef.current) {
			setDisabledInputs(false);
			setInputs({...inputs, [inputRef.current.name]: active});
		}
	}

	const onBlur = (event: FocusEvent<HTMLInputElement>) => {
		setInputs({ ...inputs, [event.target.name]: inactive });
	}

	const handleReset = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		setForm({ ...user, password: '' });
		setDisabledInputs(true);
	}

	const handleSubmit = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (form.password === '') {
			dispatch(updateUser({ name: form.name, email: form.email }));
		} else {
			dispatch(updateUser(form));
		}
		setDisabledInputs(true);
	}
	return (
		<main className={styles.main}>
			<div className={styles.links}>
				<NavLink
					to='/profile'
					className={({ isActive }) =>
						isActive ? `${styles.activeLink} text text_type_main-medium mb-9`
							: `${styles.link} text text_type_main-medium mb-9`}>
					Профиль
				</NavLink>
				<NavLink
					to='/profile/orders'
					className={({ isActive }) =>
						isActive ? `${styles.activeLink} text text_type_main-medium mb-9`
							: `${styles.link} text text_type_main-medium mb-9`}>
					История заказов
				</NavLink>
				<a className={`${styles.link} text text_type_main-medium mb-9`} onClick={handleClick}>
					Выход
				</a>
				<p className={`${styles.text} text text_type_main-default text_color_inactive mr-15 mt-20`}>
					В этом разделе вы можете
					изменить свои персональные данные
				</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.input}>
					<Input ref={nameRef}
					       type='text'
					       name='name'
					       placeholder='Имя'
					       value={form.name}
					       icon={inputs.name.icon}
					       size='default'
					       disabled={inputs.name.disabled}
					       onChange={onChange}
					       onIconClick={() => { handleIcon(nameRef) }}
					       onBlur={onBlur} />
				</div>
				<div className={styles.input}>
					<Input ref={mailRef}
					       type='email'
					       name='email'
					       placeholder='Логин'
					       value={form.email}
					       icon={inputs.email.icon}
					       size='default'
					       disabled={inputs.email.disabled}
					       onChange={onChange}
					       onIconClick={() => { handleIcon(mailRef) }}
					       onBlur={onBlur} />
				</div>
				<div className={styles.input}>
					<Input ref={pwdRef}
					       type='password'
					       name='password'
					       placeholder='Пароль'
					       value={form.password}
					       icon={inputs.password.icon}
					       size='default'
					       disabled={inputs.password.disabled}
					       onChange={onChange}
					       onIconClick={() => { handleIcon(pwdRef) }}
					       onBlur={onBlur} />
				</div>
				{!disabledInputs && <div className={`${styles.buttons}`}>
					<Button type="secondary" size="medium" onClick={handleReset}>
						Отмена
					</Button>
					<Button type="primary" size="medium">Сохранить</Button>
				</div>}
			</form>
		</main>
	)
}