import React, {useCallback} from 'react';
import styles from './forgot-password.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';

export function ForgotPassword() {

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onEmailChange ', e.target.value);
    }, [])

    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Восстановление пароля</div>
            <Input placeholder={'Укажите email'} value={''} onChange={onEmailChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Восстановить</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Вспомнили пароль? <Link to={Routes.login}>Войти</Link></div>
            </div>
        </div>
    </div>)
}