import React from 'react';
// import './SearchBox.css';

function SearchBox() {
    return (
        <div className="search-container">
            <input type="text" placeholder="Search..." />
            <div className="search"></div>
        </div>
    )
}

export default SearchBox
