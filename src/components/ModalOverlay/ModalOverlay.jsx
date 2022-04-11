import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

export default function ModalOverlay({ close }) {

	return (
		<div className={styles.overlay} onClick={close}>
		</div>
	)
}

ModalOverlay.propTypes = {
	close: PropTypes.func.isRequired,
}