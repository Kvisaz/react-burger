import React, { useCallback } from 'react';
import styles from './register.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { Routes } from '../../services/Routes';
import { MAIN_ACTION, MainActionType } from '../../services/actions';
import { useAppDispatch, useMainState } from '../../services/hooks';

export function Register() {

  const dispatch = useAppDispatch();
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

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(MAIN_ACTION.registerActionCreator({
      email, name, password,
    }));
  }, [email, name, password, dispatch]);

  return (<div className={styles.wrap}>
    {isAuthorized
      ? (<Redirect to={urlAfterLogging} />)
      : (
        <form className={styles.content} onSubmit={onSubmit}>
          <div className={`text text_type_main-medium ${styles.label}`}>??????????????????????</div>
          <Input type={'text'} placeholder={'??????'} value={name} onChange={onNameChange} size={'default'} />
          <Input type={'email'} placeholder={'Email'} value={email} onChange={onLoginChange} />
          <PasswordInput name={'password'} value={password} onChange={onPasswordChange} />
          <Button size={'medium'} type={'primary'}>????????????????????????????????????</Button>
          <div className={`text text_type_main-small ${styles.about}`}>
            <div>?????? ????????????????????????????????? <Link to={Routes.login}>??????????</Link></div>
          </div>
        </form>
      )
    }
  </div>);
}