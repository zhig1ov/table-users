import React from 'react';

const Select = ({options ,onSelect}) => {
    return (
        <select onChange={onSelect}>
            {options.map((opt) => (<option key={opt.title} value={opt.title}>{opt.value}</option>))}
        </select>
    );
};

export default Select;
