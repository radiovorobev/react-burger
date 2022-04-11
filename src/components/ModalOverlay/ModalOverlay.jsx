import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({ closeModal }) {

	return (
		<div className={styles.overlay} onClick={closeModal}>
		</div>
	)
}

ModalOverlay.propTypes = {
	close: PropTypes.func.isRequired,
}