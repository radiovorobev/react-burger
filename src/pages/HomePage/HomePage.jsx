import {useDispatch, useSelector} from 'react-redux';
import styles from './HomePage.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import Modal from '../../components/Modal/Modal';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import React from 'react';
import { INGREDIENT_MODAL } from '../../services/actions/burgers';

export function HomePage() {
	const { currentIngredient } = useSelector(store => store.modal);
	const [isIngredientModal, setIngredientModal] = React.useState(false);
	const dispatch = useDispatch();
	const handleIngredientClick = React.useCallback((item) => {
		dispatch({ type: INGREDIENT_MODAL, ingredient: item });
		setIngredientModal(true);
	})
	return (
		<>
			<main className={`${styles.container}`}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients handleIngredientClick={handleIngredientClick}/>
				<BurgerConstructor />
			</DndProvider>
			</main>
			{isIngredientModal && <Modal onClose={setIngredientModal} title={'Детали ингредиента'} >
				<IngredientDetails ingredient={currentIngredient} />
			</Modal> }
		</>
	)
}
