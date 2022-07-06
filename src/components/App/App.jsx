import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/actions';
import { Route, Router } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />

          <Route path='/' exact={true}>
            <HomePage />
          </Route>

    </>
  );
}

export default App;