import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {IngredientsContext, TotalPriceContext} from '../../services/ingredientsContext.jsx';
import Modal from '../Modal/Modal.jsx';
import { baseUrl } from '../../utils/data.jsx';
import {checkResponse} from "../../utils/utilities";
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/actions';

function App() {
  //const [state, setState] = React.useState({ ingredients: [] });
  const [totalPrice, setTotalPrice] = React.useState(0);

  const [isIngredientModal, setIngredientModal] = React.useState(false);

  const [ingredient, setIngredient] = React.useState(false);

  const handleClickIngredients = (item) => {
    setIngredient(item);
    setIngredientModal(true);
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

/*  React.useEffect(() => {
    const getIngredients = () => {
      fetch(`${baseUrl}/ingredients`)
        .then(checkResponse)
        .then((res) =>
          setState((prevState) => ({ ...prevState, ingredients: res.data }))
        )
        .catch((error) => console.log(error.message))

    }

    getIngredients();
  }, [])
*/
 // const { ingredients } = useSelector(store => store);
  //console.log(useSelector(store => store));
  return (
    <>
      <AppHeader />
      <main className={`${styles.main}`}>
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>

            <BurgerIngredients handleIngredientClick={handleClickIngredients}/>
            <BurgerConstructor />

        </TotalPriceContext.Provider>
      </main>


      {isIngredientModal && ingredient && <Modal onClose={setIngredientModal} title={'Детали ингредиента'} >
        <IngredientDetails ingredient={ingredient} />
      </Modal> }

    </>
  );
}

export default App;