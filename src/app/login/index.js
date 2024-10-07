import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/loginForm';
import Header from '../../containers/header';
import useSelector from '../../hooks/use-selector';
import { useLocation, useNavigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    error: state.auth.error,
    location: state.auth.location,
    isLogged: state.auth.isLogged,
  }));

  useInit(() => {
    store.actions.auth.resetError();
  }, [pathname]);

  useInit(() => {
    if (select.isLogged) {
      select.location && select.location != '/login' ? navigate(select.location) : navigate('/');
    }
  }, [select.isLogged]);

  const callbacks = {
    // Авторизация
    onSign: useCallback(
      formValue => {
        store.actions.auth.signIn(formValue);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Header />
      <Navigation />
      <LoginForm
        t={t}
        onSign={callbacks.onSign}
        errorMessage={select.error}
        location={select.location}
      />
    </PageLayout>
  );
}

export default memo(Login);
