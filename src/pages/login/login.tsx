import React, {useCallback, useState} from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import styles from './login.module.css';
import {Routes} from '../../services/Routes';

interface ILoginPageState {
    password: string;
    login: string;
}

export function Login() {
    const [state, setState] = useState<ILoginPageState>({
        password: '',
        login: ''
    })

    const onLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();  // deprecated since React 17
        setState((prevState => ({
            ...prevState,
            login: e.target.value
        })))
    }, [])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        setState((prevState => ({
            ...prevState,
            password: e.target.value
        })))
    }, [])

    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Вход</div>
            <Input type={'email'} placeholder={'Email'} value={state.login} onChange={onLoginChange}/>
            <PasswordInput name={'password'} value={state.password} onChange={onPasswordChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Войти</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Вы новый пользователь? <Link to={Routes.register}>Зарегистрироваться</Link></div>
                <div>Забыли пароль? <Link to={Routes.forgotPassword}>Восстановить пароль</Link></div>
            </div>
        </div>
    </div>)
}