import React, {useCallback, useState} from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';

interface IResetPageState {
    password: string;
    code: string;
}

export function ResetPassword() {

    const [state, setState] = useState<IResetPageState>({
        password: '',
        code: ''
    });

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        setState(prevState => ({
            ...prevState,
            password: e.target.value
        }))
    }, [])

    const onCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({
            ...prevState,
            code: e.target.value
        }))
    }, [])


    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Восстановление пароля</div>
            <PasswordInput name={'password'} value={state.password} onChange={onPasswordChange}/>
            <Input type={'text'} placeholder={'Введите код из письма'} value={state.code} onChange={onCodeChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Сохранить</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Вспомнили пароль? <Link to={Routes.login}>Войти</Link></div>
            </div>
        </div>
    </div>)
}