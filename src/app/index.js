import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useStore from '../hooks/use-store';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import ProfilePage from './profile-page';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const select = useSelector(state => ({
    activeModal: state.modals.name,
  }));

  useInit(() => {
    store.actions.auth.checkToken();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<ProfilePage />} />
      </Routes>

      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
