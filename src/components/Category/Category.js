import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Category.css';
export default function Category({ category, inRoom }) {
    //navigate to category page with Id
    const handleClickCategory = useCallback((e) => {
        window.location = `/category/${category.categoryId}`;
    }, []);
    return (
        <div className={`category ${inRoom}`} onClickCapture={handleClickCategory}>
            {category.name}
        </div>
    );
}
