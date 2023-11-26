import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Category from '../Category/Category';
import './css/Category.css';
export default function ListCategory() {
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        axios.get('/guest/category').then((res) => {
            if (res.data == null) {
                window.location = '/notfound';
            }
            setListCategory(res.data);
        });
    }, []);
    return (
        <div className="list-category">
            {listCategory.map((category) => (
                <Category key={category.categoryId} category={category} />
            ))}
        </div>
    );
}
