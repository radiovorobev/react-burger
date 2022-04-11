import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.css';
import {data} from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../Modal/Modal.jsx';
import * as PropTypes from 'prop-types';

Modal.propTypes = {
  onOverlayClick: PropTypes.func,
  title: PropTypes.string,
  onEscKeydown: PropTypes.func,
  children: PropTypes.node
};

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
