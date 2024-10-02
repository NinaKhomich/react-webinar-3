import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/loginForm';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();
  // const params = useParams();

  // useInit(() => {
  //     store.actions.catalog.initParams();
  //   }, []);


  // const select = useSelector(state => ({
  // }));



  // const callbacks = {
  //   // Добавление в корзину
  //   addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  // };

  return (
    <PageLayout>
      <Head title={t('title')} t={t}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm t={t}/>

    </PageLayout>
  );
}

export default memo(Login);
