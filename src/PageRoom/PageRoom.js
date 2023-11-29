import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListProductByCategory from '../components/Category/ListProductByCategory';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { addLoad, removeLoad } from '../Store';
import './PageRoom.css';

export default function PageRoom() {
    const { roomId } = useParams();
    const [productsInRoom, setProductsInRoom] = useState([]);
    const [room, setRoom] = useState([]);
    const [sort, setSort] = useState(1);
    //
    const handleClickNormal = useCallback(async (sort) => {
        if (sort != 1) {
            addLoad();
            document.getElementById(`sort${sort}-cate`).classList.remove('border-bottom-current');
            await axios

                .get(`/guest/room/products/${roomId}`)
                .then((res) => setProductsInRoom(res.data))
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
                .get(`/guest/ProductSaleByRoom/${roomId}`)
                .then((res) => setProductsInRoom(res.data))
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
                .get(`/guest/ProductDescByRoom/${roomId}`)
                .then((res) => setProductsInRoom(res.data))
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
            await axios
                .get(`/guest/ProductAscByRoom/${roomId}`)
                .then((res) => setProductsInRoom(res.data))
                .catch((err) => console.log(err));
            setSort(3);
            document.getElementById('sort3-cate').classList.add('border-bottom-current');
            removeLoad();
        }
    });
    //api call first
    const getData = async () => {
        await axios.get(`/guest/room/products/${roomId}`).then((res) => setProductsInRoom(res.data));
        await axios.get(`/guest/room/${roomId}`).then((res) => {
            if (res.data == null) {
                window.location = '/notfound';
            } else {
                setRoom(res.data);
            }
        });
    };
    useEffect(() => {
        getData();
        document.getElementById('sort1-cate').classList.add('border-bottom-current');
    }, [roomId]);
    return (
        <div>
            <Header />
            <div className="page-room-content row">
                <div className="page-room-title">
                    <label>{room.roomName}</label>
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
                <div className="row">
                    <div className="col-1"></div>
                    <div className="list-product-by-room col-10">
                        <ListProductByCategory listProduct={productsInRoom} />
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
