import { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Input from "../input";

function LoginForm({t}) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('login.title')}</h1>
      <form className={cn('form')}>
        <label className={cn('input')}>
          <span className={cn('name')}>{t('login.name')}</span>
          <Input value={''} name={'email'} theme={'login'} type={'email'}/>
        </label>
        <label className={cn('input')}>
          <span className={cn('name')}>{t('login.password')}</span>
          <Input value={''} name={'password'} theme={'login'} type={'password'}/>
        </label>
        <button className={cn('btn')} type="submit">
          {t('login.loginBtn')}
        </button>
      </form>
    </div>
  );
}

LoginForm.PropTypes = {
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  t: text => text,
};

export default LoginForm;
