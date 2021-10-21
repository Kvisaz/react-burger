import React, { useCallback, useEffect } from 'react';
import styles from './forgot-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../../services/Routes';
import { MAIN_ACTION, MainActionType } from '../../services/actions';
import { useMainState, useAppDispatch } from '../../services/hooks';

export function ForgotPassword() {

  const { userRestoreEmail: email = '', isRestoreSuccess } = useMainState();

  const dispatch = useAppDispatch();
  const history = useHistory();

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({ type: MainActionType.RESTORE_PAGE_CHANGE, email: e.target.value });
  }, [dispatch]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(MAIN_ACTION.restorePassActionCreator({ email }));
  }, [dispatch, email]);

  useEffect(() => {
    if (isRestoreSuccess) {
      history.replace({
        pathname: Routes.resetPassword,
        state: {},
      });
      return;
    }
  }, [history, isRestoreSuccess]);

  return (<div className={styles.wrap}>
    <form className={styles.content} onSubmit={onSubmit}>
      <div className={`text text_type_main-medium ${styles.label}`}>Восстановление пароля</div>
      <Input type={'email'} placeholder={'Укажите email'} value={email} onChange={onEmailChange} />
      <Button size={'medium'} type={'primary'}>Восстановить</Button>
      <div className={`text text_type_main-small ${styles.about}`}>
        <div>Вспомнили пароль? <Link to={Routes.login}>Войти</Link></div>
      </div>
    </form>
  </div>);
}