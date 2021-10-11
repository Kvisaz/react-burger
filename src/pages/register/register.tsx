import React, { useCallback } from 'react';
import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { Routes } from '../../services/Routes';
import { useDispatch } from 'react-redux';
import { MAIN_ACTION, MainActionType } from '../../services/actions';
import { useMainState } from '../../services/hooks/useMainState';

export function Register() {

  const dispatch = useDispatch();
  const {
    userRegisterEmail: email = '',
    userRegisterName: name = '',
    userRegisterPassword: password = '',
    isAuthorized,
    urlAfterLogging = Routes.main,
  } = useMainState();


  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({
      type: MainActionType.REGISTRATION_PAGE_CHANGE,
      data: {
        email, password,
        name: e.target.value,
      },
    });
  }, [dispatch, email, password]);

  const onLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({
      type: MainActionType.REGISTRATION_PAGE_CHANGE,
      data: {
        password, name,
        email: e.target.value,
      },
    });
  }, [dispatch, password, name]);

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({
      type: MainActionType.REGISTRATION_PAGE_CHANGE,
      data: {
        email, name,
        password: e.target.value,
      },
    });
  }, [dispatch, email, name]);

  const onButtonClick = useCallback(() => {
    dispatch(MAIN_ACTION.registerActionCreator({
      email, name, password,
    }));
  }, [email, name, password, dispatch]);

  return (<div className={styles.wrap}>
    {isAuthorized
      ? (<Redirect to={urlAfterLogging} />)
      : (
        <div className={styles.content}>
          <div className={`text text_type_main-medium ${styles.label}`}>Регистрация</div>
          <Input type={'text'} placeholder={'Имя'} value={name} onChange={onNameChange} size={'default'} />
          <Input type={'email'} placeholder={'Email'} value={email} onChange={onLoginChange} />
          <PasswordInput name={'password'} value={password} onChange={onPasswordChange} />
          <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Зарегистрироваться</Button>
          <div className={`text text_type_main-small ${styles.about}`}>
            <div>Уже зарегистрированы? <Link to={Routes.login}>Войти</Link></div>
          </div>
        </div>
      )
    }
  </div>);
}