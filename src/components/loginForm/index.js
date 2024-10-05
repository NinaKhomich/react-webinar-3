import { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function LoginForm({ errorMessage = null, t = text => text, onSign = () => {} }) {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeLogin = e => {
    e.preventDefault();
    setLogin(e.target.value);
  };

  const handleOnChangePassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmitSign = e => {
    e.preventDefault();
    onSign({ login: login, password: password });
  };

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('login.title')}</h1>
      <form onSubmit={handleSubmitSign} className={cn('form')}>
        <label className={cn('label')}>
          <span className={cn('name')}>{t('login.name')}</span>
          <input
            className={cn('input')}
            value={login}
            name={'login'}
            type={'text'}
            onChange={handleOnChangeLogin}
          />
        </label>
        <label className={cn('label')}>
          <span className={cn('name')}>{t('login.password')}</span>
          <input
            className={cn('input')}
            value={password}
            name={'password'}
            type={'password'}
            onChange={handleOnChangePassword}
          />
        </label>
        {errorMessage &&
          errorMessage.map((item, index) => (
            <span key={index} className={cn('error')}>
              {item}
            </span>
          ))}
        <button className={cn('btn')} type="submit">
          {t('login.loginBtn')}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  errorMessage: PropTypes.array,
  onSign: PropTypes.func,
  t: PropTypes.func,
};

export default LoginForm;
