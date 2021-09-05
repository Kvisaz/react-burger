import React, {useCallback} from 'react';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import styles from './login.module.css';
import {Routes} from '../../services/Routes';

export function Login() {
    const onLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('useCallback ', e.target.value);
    }, [])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onPasswordChange ', e.target.value);
    }, [])

    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Вход</div>
            <Input placeholder={'Email'} value={''} onChange={onLoginChange}/>
            <PasswordInput name={'password'} value={''} onChange={onPasswordChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Войти</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Вы новый пользователь? <Link to={Routes.register}>Зарегистрироваться</Link></div>
                <div>Забыли пароль? <Link to={Routes.forgotPassword}>Восстановить пароль</Link></div>
            </div>
        </div>
    </div>)
}