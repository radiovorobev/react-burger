import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.css';
import {data} from "../../utils/data";
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngridients/BurgerIngredients.jsx';

function App() {
  return (
    <>
      <AppHeader />
      <main className={`${styles.main}`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
          <BurgerIngredients data={data}/>
        <section className={styles.constructor}>
          {/*<BurgerConstructor />*/}
        </section>
      </main>
    </>
  );
}

export default App;
