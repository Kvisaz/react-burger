import React from 'react';
import styles from './burger-constructor.module.css';
import {BurgerConstructorTabs} from "./components/burger-constructor-tabs/burger-constructor-tabs";
import {BurgerConstructorSection} from "./components/burger-constructor-section/burger-constructor-section";
import {IBurgerPart} from "../../model/IBurgerPart";

interface IBurgerConstructorProps {
    parts: IBurgerPart[]
}

export function BurgerConstructor({parts}: IBurgerConstructorProps) {

    const buns: IBurgerPart[] = [];
    const fills: IBurgerPart[] = [];
    const sauces: IBurgerPart[] = [];
    parts.forEach((part) => {
        switch (part.type) {
            case 'bun':
                buns.push(part);
                break;
            case 'main':
                fills.push(part);
                break;
            case 'sauce':
                sauces.push(part);
                break;
        }
    });

    return (
        <div className='mt-5'>
            <BurgerConstructorTabs/>
            <BurgerConstructorSection title={'Булки'} parts={buns}/>
            <BurgerConstructorSection title={'Соусы'} parts={sauces}/>
            <BurgerConstructorSection title={'Начинки'} parts={fills}/>
        </div>
    );
}