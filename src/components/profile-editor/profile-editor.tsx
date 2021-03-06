import React, { useCallback, useEffect, useMemo } from 'react';
import styles from './profile-editor.module.css';
import { MAIN_ACTION, MainActionType } from '../../services/actions';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loading } from '../loading/loading';
import { useMainState } from '../../services/hooks/useMainState';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';

export function ProfileEditor() {
  const {
    isProfileSuccess = false,
    userEmail = '',
    userName = '',
    userPassword = '',
    profileName: name = userName,
    profileEmail: email = userEmail,
    profilePassword: password = userPassword,
  } = useMainState();

  const profileChanged = useMemo(() => userEmail !== email
    || userName !== name
    || password !== userPassword,
    [userName, userEmail, name, email, password, userPassword]);

  const dispatch = useAppDispatch();

  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({
      type: MainActionType.PROFILE_PAGE_CHANGE, data: {
        name: e.target.value,
        email, password,
      },
    });
  }, [dispatch, email, password]);

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({
      type: MainActionType.PROFILE_PAGE_CHANGE, data: {
        name,
        email: e.target.value,
        password,
      },
    });
  }, [dispatch, name, password]);

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // deprecated since React 17
    dispatch({
      type: MainActionType.PROFILE_PAGE_CHANGE, data: {
        name, email,
        password: e.target.value,
      },
    });
  }, [dispatch, name, email]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(MAIN_ACTION.updateProfileActionCreator());
  }, [dispatch]);

  const onResetClick = useCallback(() => {
    dispatch({ type: MainActionType.PROFILE_PAGE_RESET });
  }, [dispatch]);

  const buttonClass = useMemo(() =>
      profileChanged ? styles.buttons : `${styles.buttons} ${styles.hidden}`, [
      profileChanged,
    ],
  );

  useEffect(() => {
    if (!isProfileSuccess) {
      dispatch(MAIN_ACTION.requestProfileActionCreator());
    }
  }, [isProfileSuccess, dispatch]);

  return (
    <>
      {isProfileSuccess ? (
          <form className={styles.main} onSubmit={onSubmit}>
            <Input placeholder={'??????'} value={name} onChange={onNameChange} />
            <Input placeholder={'??????????'} value={email} onChange={onEmailChange} />
            <PasswordInput name={'password'} value={password} onChange={onPasswordChange} />
            <div className={buttonClass}>
                                    <span onClick={onResetClick}
                                          className={`text text_type_main-small ${styles.link}`}>????????????</span>
              <Button size={'medium'} type={'primary'}>??????????????????</Button>
            </div>
          </form>
        )
        : (
          <Loading />
        )}
    </>
  );
}