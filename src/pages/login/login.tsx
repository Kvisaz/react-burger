import React, {useCallback} from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import styles from './login.module.css';
import {Routes} from '../../services/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {IBurgerActionType, loginActionCreator} from '../../services/actions';
import {RootState} from '../../services/store';

export function Login() {

    const dispatch = useDispatch();
    const {
        loginPageEmail: login = '',
        loginPagePassword: password = '',
        isUserLogged,
        urlAfterLogging = Routes.main
    } = useSelector((state: RootState) => ({...state}));


    const onLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();  // deprecated since React 17
        dispatch({
            type: IBurgerActionType.LOGIN_PAGE_CHANGE, data: {
                password,
                login: e.target.value
            }
        })
    }, [dispatch, password])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();  // deprecated since React 17
        dispatch({
            type: IBurgerActionType.LOGIN_PAGE_CHANGE, data: {
                login,
                password: e.target.value
            }
        })
    }, [dispatch, login])

    const onButtonClick = useCallback(() => {
        dispatch(loginActionCreator({
            login, password
        }));
    }, [dispatch, login, password])

    return (<div className={styles.wrap}>
        {isUserLogged
            ? (<Redirect to={urlAfterLogging}/>)
            : (
                <div className={styles.content}>
                    <div className={`text text_type_main-medium ${styles.label}`}>Вход</div>
                    <Input type={'email'} placeholder={'Email'} value={login} onChange={onLoginChange}/>
                    <PasswordInput name={'password'} value={password} onChange={onPasswordChange}/>
                    <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Войти</Button>
                    <div className={`text text_type_main-small ${styles.about}`}>
                        <div>Вы новый пользователь? <Link to={Routes.register}>Зарегистрироваться</Link></div>
                        <div>Забыли пароль? <Link to={Routes.forgotPassword}>Восстановить пароль</Link></div>
                    </div>
                </div>
            )}
    </div>)
}