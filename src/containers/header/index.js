import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import HeadLogin from '../../components/head-login';
import Head from '../../components/head';
import LocaleSelect from '../locale-select';
import { useLocation } from 'react-router-dom';

/**
 * Контейнер списка товаров с пагинацией
 */
function Header() {
  const store = useStore();
  const { pathname } = useLocation();

  const select = useSelector(state => ({
    articleTitle:  state.article.data.title,
    user: state.user.userData,
    isLogged: state.user.isLogged,
  }));

  const callbacks = {
    logoutUser:  useCallback(() => store.actions.user.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <>
      <HeadLogin  isLogged={select.isLogged} t={t} userName={select.user.profile?.name} onLogout={callbacks.logoutUser}/>
      <Head title={ pathname.includes('/articles') ? select.articleTitle : t('title') } >
        <LocaleSelect />
      </Head>
    </>
  );
}

export default memo(Header);
