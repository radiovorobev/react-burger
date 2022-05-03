import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

export default function ModalOverlay({ closeModal }) {
	return (
		<div className={styles.overlay} onClick={closeModal}>
		</div>
	)
}

ModalOverlay.propTypes = {
	closeModal: PropTypes.func.isRequired,
}