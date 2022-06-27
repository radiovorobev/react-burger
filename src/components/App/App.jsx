import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {TotalPriceContext} from '../../services/ingredientsContext.jsx';
import Modal from '../Modal/Modal.jsx';

import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, INGREDIENT_MODAL } from '../../services/actions/actions';

function App() {

  const [totalPrice, setTotalPrice] = React.useState(0);

  const [isIngredientModal, setIngredientModal] = React.useState(false);

  const handleIngredientClick = React.useCallback((item) => {
    dispatch({ type: INGREDIENT_MODAL, ingredient: item });
    setIngredientModal(true);
    console.log(item);
    console.log(currentIngredient);
    console.log(isIngredientModal);
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
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>

            <BurgerIngredients handleIngredientClick={handleIngredientClick}/>
            <BurgerConstructor />

        </TotalPriceContext.Provider>
      </main>

      {isIngredientModal && <Modal onClose={setIngredientModal} title={'Детали ингредиента'} >
        <IngredientDetails ingredient={currentIngredient} />
      </Modal> }

    </>
  );
}

export default App;