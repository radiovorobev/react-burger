import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal.jsx';

import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, INGREDIENT_MODAL } from '../../services/actions/actions';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {

  const [isIngredientModal, setIngredientModal] = React.useState(false);

  const handleIngredientClick = React.useCallback((item) => {
    dispatch({ type: INGREDIENT_MODAL, ingredient: item });
    setIngredientModal(true);
  })

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

 const { currentIngredient } = useSelector(store => store);
  return (
    <>
      <AppHeader />
      <main className={`${styles.main}`}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients handleIngredientClick={handleIngredientClick}/>
            <BurgerConstructor />
        </DndProvider>
      </main>

      {isIngredientModal && <Modal onClose={setIngredientModal} title={'Детали ингредиента'} >
        <IngredientDetails ingredient={currentIngredient} />
      </Modal> }

    </>
  );
}

export default App;