import { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Profile({ user, t }) {
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('profile.title')}</h1>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.name')}</div>
        <div className={cn('value')}>{user.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.phone')}</div>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{'email:'}</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
  }),
  t: PropTypes.func,
};

Profile.defaultProps = {
  t: text => text,
};

export default Profile;
