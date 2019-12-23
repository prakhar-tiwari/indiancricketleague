import React from 'react';
import './Auth.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TextFieldGroup = ({
    name,
    change,
    type,
    placeholder,
    faIcon
}) => {
    return (
        <div className="input-group form-group input-field">
            <div className="prepend">
                <span className="input-group-text"><FontAwesomeIcon icon={faIcon}></FontAwesomeIcon></span>
            </div>
            <input 
            className="form-control" 
            name={name} 
            onChange={change} 
            type={type} 
            placeholder={placeholder} />
        </div>
    )
}

export default TextFieldGroup;