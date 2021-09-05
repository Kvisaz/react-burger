import React, {useCallback} from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';

export function ResetPassword() {

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onPasswordChange ', e.target.value);
    }, [])

    const onCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onCodeChange ', e.target.value);
    }, [])


    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Восстановление пароля</div>
            <PasswordInput name={'password'} value={''} onChange={onPasswordChange}/>
            <Input placeholder={'Введите код из письма'} value={''} onChange={onCodeChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Сохранить</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Вспомнили пароль? <Link to={Routes.login}>Войти</Link></div>
            </div>
        </div>
    </div>)
}