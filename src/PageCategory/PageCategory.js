import axios from 'axios';
import './css/Category.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListProductByCategory from '../components/Category/ListProductByCategory';
import Header from '../components/Header/Header';
import { addLoad, removeLoad } from '../Store';
import Footer from '../components/Footer/Footer';
export default function PageCategory() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [sort, setSort] = useState(1);
    //
    const handleClickNormal = useCallback(async (sort) => {
        if (sort != 1) {
            addLoad();
            document.getElementById(`sort${sort}-cate`).classList.remove('border-bottom-current');
            await axios
                .get(`/guest/productsByCategory/${categoryId}`)
                .then((res) => setListProduct(res.data))
                .catch((err) => console.log(err));
            setSort(1);
            document.getElementById('sort1-cate').classList.add('border-bottom-current');
            removeLoad();
        }
    });
    const handleClickSale = useCallback(async (sort) => {
        if (sort != 2) {
            addLoad();
            document.getElementById(`sort${sort}-cate`).classList.remove('border-bottom-current');
            await axios
                .get(`/guest/productsByCategoryOrderDiscount/${categoryId}`)
                .then((res) => setListProduct(res.data))
                .catch((err) => console.log(err));
            setSort(2);
            document.getElementById('sort2-cate').classList.add('border-bottom-current');
            removeLoad();
        }
    });
    const handleClickDesc = useCallback(async (sort) => {
        if (sort != 4) {
            addLoad();
            document.getElementById(`sort${sort}-cate`).classList.remove('border-bottom-current');
            await axios
                .get(`/guest/productsByCategoryDesc/${categoryId}`)
                .then((res) => setListProduct(res.data))
                .catch((err) => console.log(err));
            setSort(4);
            document.getElementById('sort4-cate').classList.add('border-bottom-current');
            removeLoad();
        }
    });
    const handleClickAsc = useCallback(async (sort) => {
        if (sort != 3) {
            addLoad();
            document.getElementById(`sort${sort}-cate`).classList.remove('border-bottom-current');
            axios
                .get(`/guest/productsByCategoryAsc/${categoryId}`)
                .then((res) => setListProduct(res.data))
                .catch((err) => console.log(err));
            setSort(3);
            document.getElementById('sort3-cate').classList.add('border-bottom-current');
            removeLoad();
        }
    });
    const getData = async () => {
        await axios
            .get(`/guest/getCategory/${categoryId}`)
            .then((res) => setCategory(res.data))
            .catch((err) => console.log(err));
        await axios
            .get(`/guest/productsByCategory/${categoryId}`)
            .then((res) => setListProduct(res.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData();
        document.getElementById('sort1-cate').classList.add('border-bottom-current');
    }, [categoryId]);
    return (
        <div className='page-category'>
            <Header />
            <div className="page-category">
                <div className="page-category-img">
                    <img src={category.image}></img>
                    <h3>{category.name}</h3>
                </div>
                <div className="combobox-sort">
                    <div className="sort-select">
                        <div id="sort1-cate" onClick={() => handleClickNormal(sort)}>
                            Tất cả sản phẩm
                        </div>
                        <div id="sort2-cate" onClick={() => handleClickSale(sort)}>
                            Giảm giá
                        </div>
                        <div id="sort3-cate" onClick={() => handleClickAsc(sort)}>
                            Giá thấp đến cao
                        </div>
                        <div id="sort4-cate" onClick={() => handleClickDesc(sort)}>
                            Giá cao đến thấp
                        </div>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-caret-left-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                            </svg>
                            /
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-caret-right-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-1"></div>
                <div className="product-by-category col-10">
                    <ListProductByCategory listProduct={listProduct} />
                </div>
                <div className="col-1"></div>
            </div>

            <Footer></Footer>
        </div>
    );
}
