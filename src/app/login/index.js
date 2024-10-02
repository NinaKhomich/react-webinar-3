import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/loginForm';
import LocaleSelect from '../../containers/locale-select';

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();



  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
  }));

  const callbacks = {
    // Авторизация
    onSign: useCallback((formValue) => {
      store.actions.user.signIn(formValue);
      console.log(formValue);
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title={t('title')} t={t} isLogged={select.isLogged}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm t={t} onSign={callbacks.onSign}/>

    </PageLayout>
  );
}

export default memo(Login);
