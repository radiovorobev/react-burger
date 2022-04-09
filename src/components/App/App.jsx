import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.css';
import {data} from "../../utils/data";
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngridients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';

function App() {
  return (
    <>
      <AppHeader />
      <main className={`${styles.main}`}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
      </main>
    </>
  );
}

export default App;
