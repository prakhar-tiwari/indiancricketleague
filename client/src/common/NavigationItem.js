import React from 'react';
import {NavLink} from 'react-router-dom';

function NavigationItem(props) {
    return (
    <li className={props.cls}><NavLink activeStyle={{color:'#024f6d'}} to={props.route} className="nav-link">{props.content}</NavLink></li>
    )
}

export default NavigationItem;
