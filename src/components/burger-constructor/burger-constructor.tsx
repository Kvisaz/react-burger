import React from 'react';
import styles from './burger-constructor.module.css';
import {BurgerConstructorTabs} from "./components/burger-constructor-tabs/burger-constructor-tabs";

interface IBurgerConstructorProps {

}

export function BurgerConstructor({}: IBurgerConstructorProps) {
    return (
        <div className='mt-5'>
            <BurgerConstructorTabs/>
        </div>
    );
}