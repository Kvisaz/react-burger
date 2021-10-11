import React, { useCallback, useEffect } from 'react';
import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../../services/Routes';
import { useDispatch } from 'react-redux';
import { MAIN_ACTION, MainActionType } from '../../services/actions';
import { useMainState } from '../../services/hooks';

export function ResetPassword() {

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    userResetPassword = '',
    userResetCode = '',
    isRestoreSuccess,
  } = useMainState();

  useEffect(() => {
    if (!isRestoreSuccess) {
      history.replace({
        pathname: Routes.main,
      });
    }
  }, [history, isRestoreSuccess]);

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({
      type: MainActionType.RESET_PAGE_CHANGE,
      code: userResetCode,
      password: e.target.value,
    });
  }, [userResetCode, dispatch]);

  const onCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: MainActionType.RESET_PAGE_CHANGE,
      code: e.target.value,
      password: userResetPassword,
    });
  }, [dispatch, userResetPassword]);


  const onButtonClick = useCallback(() => {
    dispatch(MAIN_ACTION.resetPassActionCreator());
  }, [dispatch]);

  return (<div className={styles.wrap}>
    <div className={styles.content}>
      <div className={`text text_type_main-medium ${styles.label}`}>Восстановление пароля</div>
      <PasswordInput name={'password'} value={userResetPassword} onChange={onPasswordChange} />
      <Input type={'text'} placeholder={'Введите код из письма'} value={userResetCode} onChange={onCodeChange} />
      <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Сохранить</Button>
      <div className={`text text_type_main-small ${styles.about}`}>
        <div>Вспомнили пароль? <Link to={Routes.login}>Войти</Link></div>
      </div>
    </div>
  </div>);
}