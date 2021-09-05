import React, {useCallback, useState} from 'react';
import styles from './forgot-password.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';

interface IForgotPageState {
    email: string;
}

export function ForgotPassword() {

    const [state, setState] = useState<IForgotPageState>({
        email: ''
    })

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        setState(prevState => ({
            ...prevState,
            email: e.target.value
        }))
    }, [])

    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Восстановление пароля</div>
            <Input type={'email'} placeholder={'Укажите email'} value={state.email} onChange={onEmailChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Восстановить</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Вспомнили пароль? <Link to={Routes.login}>Войти</Link></div>
            </div>
        </div>
    </div>)
}