import { memo, useCallback, useEffect, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import Profile from '../../components/profile';

function ProfilePage() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.user.userData,
    isLogged: state.user.isLogged,
  }));

  console.log(select.user);


  const callbacks = {
    logoutUser:  useCallback(() => store.actions.user.logout(), [store]),
  };

  return (
    <PageLayout>
      <Head title={t('title')} t={t} isLogged={select.isLogged}  onLogout={select.isLogged && callbacks.logoutUser} userName={select.user.profile?.name}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Profile user={select.user} t={t}/>

    </PageLayout>
  );
}

export default memo(ProfilePage);
