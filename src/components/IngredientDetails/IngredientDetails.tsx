import styles from './IngredientDetails.module.css';
import { useSelector } from '../../utils/types';
import { useParams } from 'react-router-dom';
import React, {FC} from 'react';

export const IngredientDetails: FC = () => {
	const { ingredients } = useSelector(store => store.ingredients);
	const { id } = useParams();
	const currentIngredient = ingredients.find(item => item._id === id);
	return (
		currentIngredient ? (
		<div className={styles.container}>
			<img src={currentIngredient.image} alt={currentIngredient.name} className={styles.image} />
			<p className='text text_type_main-medium mt-4'>{currentIngredient.name}</p>
			<ul className={`${styles.list} mt-8 mb-15`}>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Калории, ккал</p>
					<p className='text text_color_inactive text_type_digits-default'>{currentIngredient.calories}</p>
				</li>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Белки, г</p>
					<p className='text text_color_inactive text_type_digits-default'>{currentIngredient.proteins}</p>
				</li>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Жиры, г</p>
					<p className='text text_color_inactive text_type_digits-default'>{currentIngredient.fat}</p>
				</li>
				<li className={styles.item}>
					<p className='text text_color_inactive text_type_main-default'>Углеводы, г</p>
					<p className='text text_color_inactive text_type_digits-default'>{currentIngredient.carbohydrates}</p>
				</li>
			</ul>
		</div>) : null
	)
}

