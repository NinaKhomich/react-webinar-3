import { memo, useCallback, useEffect, useMemo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Header from '../../containers/header';
import Navigation from '../../containers/navigation';
import Profile from '../../components/profile';

function ProfilePage() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    user: state.user.userData,
  }));

  return (
    <PageLayout>
      <Header />
      <Navigation />
      <Profile user={select.user} t={t} />
    </PageLayout>
  );
}

export default memo(ProfilePage);
