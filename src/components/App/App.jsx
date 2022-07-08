import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burgers';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegPage } from '../../pages/RegPage/RegPage';
import { ForgotPwdPage } from '../../pages/ForgotPwdPage/ForgotPwdPage';
import { ResetPwdPage } from '../../pages/ResetPwdPage/ResetPwdPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { Page404 } from '../../pages/Page404/Page404';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
        <Routes>
          <Route path='/' exact={true} element={<HomePage />} />

          <Route path='/login' exact={true} element={<LoginPage />} />

          <Route path='/register' exact={true} element={<RegPage />} />

          <Route path='/forgot-password' exact={true} element={<ForgotPwdPage />} />

          <Route path='/reset-password' exact={true} element={<ResetPwdPage />} />

          <Route path='/profile' exact={true} element={<ProfilePage />} />

          <Route path='*' element={<Page404 />} />

        </Routes>
    </>
  );
}

export default App;