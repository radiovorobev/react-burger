import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';
import { FC } from 'react';

type TCloseModal = {
	closeModal: () => void;
}

export const ModalOverlay: FC<TCloseModal> = ({ closeModal }) => {
	return (
		<div className={styles.overlay} onClick={closeModal}>
		</div>
	)
}

ModalOverlay.propTypes = {
	closeModal: PropTypes.func.isRequired,
}