import React from 'react';
import styles from './burger-constructor.module.css';
import {BurgerConstructorTabs} from "./components/burger-constructor-tabs/burger-constructor-tabs";
import {BurgerConstructorSection} from "./components/burger-constructor-section/burger-constructor-section";

interface IBurgerConstructorProps {

}

export function BurgerConstructor({}: IBurgerConstructorProps) {
    return (
        <div className='mt-5'>
            <BurgerConstructorTabs/>
            <BurgerConstructorSection title={'Булки'}>
                ddd
            </BurgerConstructorSection>
            <BurgerConstructorSection title={'Соусы'}>
                ddd
            </BurgerConstructorSection>
            <BurgerConstructorSection title={'Начинки'}>
                ddd
            </BurgerConstructorSection>
        </div>
    );
}