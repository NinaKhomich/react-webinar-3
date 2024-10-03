import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import ProfilePage from './profile-page';
import ProtectedRoute from '../components/protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isLogged: state.user.isLogged,
  }));

  useEffect(() => {
    const token = localStorage.getItem('X-Token');
    if (token) {
      store.actions.user.checkToken(token);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route
          path={'/login'}
          element={
            <ProtectedRoute isLoggedIn={!select.isLogged} link={'/profile'}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute isLoggedIn={select.isLogged} link={'/login'}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
