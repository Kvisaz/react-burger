import React, { useCallback } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import styles from './login.module.css';
import { Routes } from '../../services/Routes';
import { useDispatch } from 'react-redux';
import { MAIN_ACTION, MainActionType } from '../../services/actions';
import { useMainState } from '../../services/hooks/useMainState';

export function Login() {

  const dispatch = useDispatch();
  const {
    loginPageEmail: email = '',
    loginPagePassword: password = '',
    isAuthorized,
    urlAfterLogging = Routes.main,
  } = useMainState();


  const onLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();  // deprecated since React 17
    dispatch({
      type: MainActionType.LOGIN_PAGE_CHANGE, data: {
        password,
        email: e.target.value,
      },
    });
  }, [dispatch, password]);

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();  // deprecated since React 17
    dispatch({
      type: MainActionType.LOGIN_PAGE_CHANGE, data: {
        email,
        password: e.target.value,
      },
    });
  }, [dispatch, email]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(MAIN_ACTION.loginActionCreator({
      email, password,
    }));
  }, [dispatch, email, password]);

  return (<div className={styles.wrap}>
    {isAuthorized
      ? (<Redirect to={urlAfterLogging} />)
      : (
        <form className={styles.content} onSubmit={onSubmit}>
          <div className={`text text_type_main-medium ${styles.label}`}>Вход</div>
          <Input type={'email'} placeholder={'Email'} value={email} onChange={onLoginChange} />
          <PasswordInput name={'password'} value={password} onChange={onPasswordChange} />
          <Button size={'medium'} type={'primary'}>Войти</Button>
          <div className={`text text_type_main-small ${styles.about}`}>
            <div>Вы новый пользователь? <Link to={Routes.register}>Зарегистрироваться</Link></div>
            <div>Забыли пароль? <Link to={Routes.forgotPassword}>Восстановить пароль</Link></div>
          </div>
        </form>
      )}
  </div>);
}