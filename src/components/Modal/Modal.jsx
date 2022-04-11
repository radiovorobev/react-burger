import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
const modalContainer = document.getElementById('modals');

export default function Modal(props) {
	const close = React.useCallback(() => {
		props.onClose(false);
	}, [props.onClose])
	const closeEsc = React.useCallback((e) => {
		if (e.key === 'Escape') {
			close();
		}
	}, [close])

	React.useEffect(() => {
		document.addEventListener('keydown', closeEsc);

		return () => {
			document.removeEventListener('keydown', closeEsc);
		}
	}, []);

	return ReactDOM.createPortal(
		(
			<>
				<div className={styles.container}>
					<div className={styles.modal}>
						<div className={styles.buttonClose} onClick={close}>
							<CloseIcon type='primary' />
						</div>
						{props.title &&
							<h2 className={`${styles.title} text text_type_main-large mt-10`}>{props.title}</h2>}
						{props.children}
					</div>
					<ModalOverlay close={close} />
				</div>
			</>
		),
		modalContainer
	);
}

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	children: PropTypes.element.isRequired
}