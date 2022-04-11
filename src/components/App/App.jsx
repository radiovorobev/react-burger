import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../Modal/Modal.jsx';
import * as PropTypes from 'prop-types';

function App() {
  const [state, setState] = React.useState({ ingredients: [] });

  const api = 'https://norma.nomoreparties.space/api/ingredients';

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

  return (
    <>
      <AppHeader />
      <main className={`${styles.main}`}>
          <BurgerIngredients data={ingredients}/>
          <BurgerConstructor data={ingredients}/>
      </main>
    </>
  );
}

export default App;

Modal.propTypes = {
  onOverlayClick: PropTypes.func,
  title: PropTypes.string,
  onEscKeydown: PropTypes.func,
  children: PropTypes.node
};