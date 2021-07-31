import React from "react";
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header-item.module.css';
import PropTypes from 'prop-types';

export enum ICON {
    Burger,
    List,
    Person
}

export enum MODE {
    active = 'primary',
    default = 'secondary'
}


interface IAppHeaderItemProps {
    text: string;
    icon: ICON;
    active?: boolean;
}

AppHeaderItem.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.number.isRequired,
    active: PropTypes.bool,
};

export function AppHeaderItem({text, icon, active}: IAppHeaderItemProps) {
    const className = `${styles.item} p-5`;
    active = active === true;

    function getMode(active: boolean): MODE.active | MODE.default {
        return active ? MODE.active : MODE.default;
    }

    function getTextClassName(active: boolean): string {
        const className = "text text_type_main-default ml-2 ";
        const inActive = "text_color_inactive";
        return active ? className : className + inActive;
    }

    function getIcon(icon: ICON, active: boolean): JSX.Element {
        switch (icon) {
            case ICON.List:
                return (<ListIcon type={getMode(active)}/>);
            case ICON.Person:
                return (<ProfileIcon type={getMode(active)}/>);
            case ICON.Burger:
                return (<BurgerIcon type={getMode(active)}/>);
            default:
                return (<BurgerIcon type={getMode(active)}/>);
        }
    }

    return (
        <span className={className}>
            {getIcon(icon, active)}
            <span className={getTextClassName(active)}>{text}</span>
        </span>
    )
}