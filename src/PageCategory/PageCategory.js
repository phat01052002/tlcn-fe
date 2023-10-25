import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    //change select
    const handleChangeSelect = useCallback((e) => {
        if (e.target.value == 1) {
            axios
                .get(`/guest/productsByCategoryAsc/${categoryId}`)
                .then((res) => setListProduct(res.data))
                .catch((err) => console.log(err));
        } else if (e.target.value == 2) {
            axios
                .get(`/guest/productsByCategoryDesc/${categoryId}`)
                .then((res) => setListProduct(res.data))
                .catch((err) => console.log(err));
        } else if (e.target.value == 3) {
            axios
                .get(`/guest/productsByCategoryOrderDiscount/${categoryId}`)
                .then((res) => setListProduct(res.data))
                .catch((err) => console.log(err));
        } else {
            setListProduct([]);
        }
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
            <Header />
            <div className="page-category">
                <div className="page-category-img">
                    <img src={category.image}></img>
                    <h3>{category.name}</h3>
                </div>
                <div className="select-sort">
                    <div className="combobox-sort">
                        <label>Sắp xếp theo</label>
                        <select class="form-select" aria-label="Default select example" onChange={handleChangeSelect}>
                            <option selected>Chọn</option>
                            <option value="1">Tăng dần</option>
                            <option value="2">Giảm dần </option>
                            <option value="3">Giảm giá</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="product-by-category">
                <ListProductByCategory listProduct={listProduct} />
            </div>
        </div>
    );
}
