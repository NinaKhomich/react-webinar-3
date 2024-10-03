import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/loginForm';
import Header from '../../containers/header';
import useSelector from '../../hooks/use-selector';

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    error: state.user.error,
  }));

  const callbacks = {
    // Авторизация
    onSign: useCallback(
      formValue => {
        store.actions.user.signIn(formValue);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Header />
      <Navigation />
      <LoginForm t={t} onSign={callbacks.onSign} errorMessage={select.error} />
    </PageLayout>
  );
}

export default memo(Login);
