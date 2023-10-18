import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Category from '../Category/Category';
import './css/Category.css';
export default function ListCategory() {
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        axios
            .get('/guest/category')
            .then((res) => setListCategory(res.data))
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="list-category">
            {listCategory.map((category) => (
                <Category key={category.categoryId} category={category}/>
            ))}
        </div>
    );
}
