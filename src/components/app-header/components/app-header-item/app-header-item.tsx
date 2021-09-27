import React from "react";
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useRouteMatch} from 'react-router-dom';
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
    to: string;
    icon: ICON;
    active?: boolean;
}

AppHeaderItem.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.number.isRequired,
    active: PropTypes.bool,
};

export function AppHeaderItem({text, icon, to}: IAppHeaderItemProps) {
    const className = `${styles.item} p-5`;
    const match = useRouteMatch({
        path: to,
        strict: true,
        sensitive: true
    });
    const active = match != null && match.isExact;
    const iconType = active ? MODE.active : MODE.default;
    return (
        <NavLink to={to} className={className} activeClassName={styles.active} exact={true}>
            {getIcon(icon, iconType)}
            <span className={getTextClassName(active)}>{text}</span>
        </NavLink>
    )
}

function getTextClassName(active: boolean): string {
    const className = "text text_type_main-default ml-2 ";
    const inActive = "text_color_inactive";
    return active ? className : className + inActive;
}

declare type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

function getIcon(icon: ICON, iconType: TIconTypes): JSX.Element {
    switch (icon) {
        case ICON.List:
            return (<ListIcon type={iconType}/>);
        case ICON.Person:
            return (<ProfileIcon type={iconType}/>);
        case ICON.Burger:
            return (<BurgerIcon type={iconType}/>);
        default:
            return (<BurgerIcon type={iconType}/>);
    }
}