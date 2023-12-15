import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HEADER_API } from '../../Store/Contants';
import Category from '../Category/Category';
import './css/Category.css';
export default function ListCategory() {
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        axios.get(`${HEADER_API}/guest/category`).then((res) => {
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
