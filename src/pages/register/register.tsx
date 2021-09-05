import React, {useCallback, useState} from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';

interface IRegisterPageState {
    email: string;
    name: string;
    password: string;
}

export function Register() {

    const [state, setState] = useState<IRegisterPageState>({
        email: '',
        name: '',
        password: ''
    })

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        setState(prevState => ({
            ...prevState,
            name: e.target.value
        }))
    }, [])

    const onLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        setState(prevState => ({
            ...prevState,
            email: e.target.value
        }))
    }, [])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist(); // deprecated since React 17
        setState(prevState => ({
            ...prevState,
            password: e.target.value
        }))
    }, [])

    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Регистрация</div>
            <Input type={'text'} placeholder={'Имя'} value={state.name} onChange={onNameChange} size={'default'}/>
            <Input type={'email'} placeholder={'Email'} value={state.email} onChange={onLoginChange}/>
            <PasswordInput name={'password'} value={state.password} onChange={onPasswordChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Зарегистрироваться</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Уже зарегистрированы? <Link to={Routes.login}>Войти</Link></div>
            </div>
        </div>
    </div>)
}