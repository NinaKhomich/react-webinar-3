import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import HeadLogin from '../../components/head-login';
import Head from '../../components/head';
import LocaleSelect from '../locale-select';
import { useLocation } from 'react-router-dom';

/**
 * Контейнер шапки сайта
 */
function Header() {
  const store = useStore();
  const { pathname } = useLocation();

  const select = useSelector(state => ({
    articleTitle: state.article.data.title,
    currentUser: state.auth.currentUserData,
    isLogged: state.auth.isLogged,
  }));

  const callbacks = {
    logoutUser: useCallback(() => store.actions.auth.logout(), [store]),
    removeLocation: useCallback(() => store.actions.auth.removeLocation(), [store]),
    setLocation: useCallback(location => store.actions.auth.setLocation(location), [store]),
  };

  const { t } = useTranslate();

  return (
    <>
      <HeadLogin
        isLogged={select.isLogged}
        t={t}
        userName={select.currentUser.profile?.name}
        onLogout={callbacks.logoutUser}
        removeLocation={callbacks.removeLocation}
        setLocation={callbacks.setLocation}
      />
      <Head title={pathname.includes('/articles') ? select.articleTitle : t('title')}>
        <LocaleSelect />
      </Head>
    </>
  );
}

export default memo(Header);
