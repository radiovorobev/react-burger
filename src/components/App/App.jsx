import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { IngredientsContext } from '../services/ingredientsContext.jsx';
import Modal from '../Modal/Modal.jsx';
import styles from './App.module.css';

function App() {
  const [state, setState] = React.useState({ ingredients: [] });
  const api = 'https://norma.nomoreparties.space/api/ingredients';

  const [isIngredientModal, setIngredientModal] = React.useState(false);
  const [isOrderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const [ingredient, setIngredient] = React.useState(false);

  const handleClickIngredients = (item) => {
    setIngredient(item);
    setIngredientModal(true);
  }

  const handleClickOrder = () => {
    setOrderDetailsModal(true);
  }

  React.useEffect(() => {
    const getIngredients = () => {
      setState({ ...state });
      fetch(`${api}`)
        .then(res => {
          if(res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
        })
        .then(res => { setState({ ...state, ingredients: res.data }) })
        .catch((error) => console.log(error.message))
    }

    getIngredients();
  }, [])

  const { ingredients } = state;
  console.log(ingredients);
  return (
    <>
      <AppHeader />
      <main className={`${styles.main}`}>
        <IngredientsContext.Provider value={ingredients}>
          <BurgerIngredients handleIngredientClick={handleClickIngredients}/>
          <BurgerConstructor handleOrderClick={handleClickOrder} />
        </IngredientsContext.Provider>
      </main>


      {isIngredientModal && ingredient && <Modal onClose={setIngredientModal} title={'Детали ингредиента'} >
        <IngredientDetails ingredient={ingredient} />
      </Modal> }

      {isOrderDetailsModal && <Modal onClose={setOrderDetailsModal}>
        <OrderDetails />
      </Modal> }


    </>
  );
}

export default App;