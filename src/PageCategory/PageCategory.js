import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { useParams } from 'react-router-dom';
import ListProductByCategory from '../components/Category/ListProductByCategory';
import Header from '../components/Header/Header';
export default function PageCategory() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        axios
            .get(`/guest/getCategory/${categoryId}`)
            .then((res) => setCategory(res.data))
            .catch((err) => console.log(err));
    }, []);

    //get product by Category

    useEffect(() => {
        axios
            .get(`/guest/productsByCategory/${categoryId}`)
            .then((res) => setListProduct(res.data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            <Header/>
            <div className="page-category">
                <div className="page-category-img">
                    <img src={category.image}></img>
                    <h3>{category.name}</h3>
                </div>
            </div>
            <div className="product-by-category">
                <ListProductByCategory listProduct={listProduct} />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}
