import { memo, useCallback, useEffect, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Header from '../../containers/header';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import Profile from '../../components/profile';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.userData,
    waiting: state.user.waiting,
  }));

  const token = localStorage.getItem('X-Token');
  useEffect(() => {
    token ? store.actions.user.loadUserData(token) : navigate('/login');
  }, []);

  return (
    <PageLayout>
      <Header />
      <Navigation />
      <Spinner active={select.waiting}>
        <Profile user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(ProfilePage);
