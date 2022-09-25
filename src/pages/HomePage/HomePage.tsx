import styles from './HomePage.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients';
import {BurgerConstructor} from '../../components/BurgerConstructor/BurgerConstructor';
import React, { FC } from 'react';

export const HomePage: FC = () => {
	return (
		<>
			<main className={`${styles.container}`}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor />
			</DndProvider>
			</main>
		</>
	)
}
