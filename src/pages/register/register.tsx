import React, {useCallback} from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {Routes} from '../../services/Routes';

export function Register() {

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onNameChange ', e.target.value);
    }, [])

    const onLoginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onLoginChange ', e.target.value);
    }, [])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onPasswordChange ', e.target.value);
    }, [])

    const onButtonClick = useCallback(() => {
        console.log('onButtonClick');
    }, [])

    return (<div className={styles.wrap}>
        <div className={styles.content}>
            <div className={`text text_type_main-medium ${styles.label}`}>Регистрация</div>
            <Input placeholder={'Имя'} value={''} onChange={onNameChange} size={'default'}/>
            <Input placeholder={'Email'} value={''} onChange={onLoginChange}/>
            <PasswordInput name={'password'} value={''} onChange={onPasswordChange}/>
            <Button onClick={onButtonClick} size={'medium'} type={'primary'}>Зарегистрироваться</Button>
            <div className={`text text_type_main-small ${styles.about}`}>
                <div>Уже зарегистрированы? <Link to={Routes.login}>Войти</Link></div>
            </div>
        </div>
    </div>)
}