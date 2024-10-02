import { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from "react-router-dom";

function LoginForm({t, onSign}) {
  const navigate = useNavigate();
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeLogin = (e) => {
    e.preventDefault();
    setLogin(e.target.value);
  }

  const handleOnChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleSubmitSign = (e) => {
    e.preventDefault();
    onSign({login: login, password: password});
    // navigate('/profile');
  }

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('login.title')}</h1>
      <form onSubmit={handleSubmitSign} className={cn('form')}>
        <label className={cn('input')}>
          <span className={cn('name')}>{t('login.name')}</span>
          <input value={login} name={'login'} type={'text'} onChange={handleOnChangeLogin}/>
        </label>
        <label className={cn('input')}>
          <span className={cn('name')}>{t('login.password')}</span>
          <input value={password} name={'password'} type={'password'} onChange={handleOnChangePassword}/>
        </label>
        <span className={cn('error')}>error-Message</span>
        <button className={cn('btn')} type="submit" >
          {t('login.loginBtn')}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSign: PropTypes.func,
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  onSign: () => {},
  t: text => text,
};

export default LoginForm;
