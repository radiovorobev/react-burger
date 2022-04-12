import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

export default function IngredientDetails({ ingredient }) {
	return (
		<>
			<img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
			<p className='text text_type_main-medium mt-4'>{ingredient.name}</p>
			<ul className={`${styles.list} mt-8 mb-15`}>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Калории, ккал</p>
					<p className='text text_color_inactive text_type_digits-default'>{ingredient.calories}</p>
				</li>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Белки, г</p>
					<p className='text text_color_inactive text_type_digits-default'>{ingredient.proteins}</p>
				</li>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Жиры, г</p>
					<p className='text text_color_inactive text_type_digits-default'>{ingredient.fat}</p>
				</li>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Углеводы, г</p>
					<p className='text text_color_inactive text_type_digits-default'>{ingredient.carbohydrates}</p>
				</li>
			</ul>
		</>
	)
}

IngredientDetails.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	__v: PropTypes.number.isRequired,
}