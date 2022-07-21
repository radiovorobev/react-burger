import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';

const modalContainer = document.getElementById('modals');

export default function Modal(props) {
	const navigate = useNavigate();
	const closeModal = React.useCallback(() => {
		if (props.onClose) {
			props.onClose(false);
		} else {
			navigate(-1);
		}
	}, [props.onClose]);

	const closeEsc = React.useCallback((e) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	}, [closeModal])

	React.useEffect(() => {
		document.addEventListener('keydown', closeEsc);
		return () => {
			document.removeEventListener('keydown', closeEsc);
		}
	}, [closeEsc]);

	return ReactDOM.createPortal(
		(
			<>
				<div className={styles.container}>
					<div className={styles.modal}>
						<div className={styles.buttonClose} onClick={closeModal}>
							<CloseIcon type='primary' />
						</div>
						{props.title &&
							<h2 className={`${styles.title} text text_type_main-large mt-10`}>{props.title}</h2>}
						{props.children}
					</div>
					<ModalOverlay closeModal={closeModal} />
				</div>
			</>
		),
		modalContainer
	);
}
