import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryHomePage({ category }) {
    const nav = useNavigate();
    const handleClick = useCallback(() => {
        window.location = `/category/${category.categoryId}`;
    }, []);
    return (
        <div className="category-homepage" onClick={handleClick}>
            <img src={category.icon}></img>
            <label>{category.name}</label>
        </div>
    );
}
