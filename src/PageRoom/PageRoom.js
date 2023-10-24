import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner/Banner';
import ListProductByCategory from '../components/Category/ListProductByCategory';
import ComboBoxSort from '../components/ComboBoxSort/ComboBoxSort';
import Header from '../components/Header/Header';
import ListCategoryInRoom from './ListCategoryInRoom';
import './PageRoom.css';

export default function PageRoom() {
    const { roomId } = useParams();
    const [productsInRoom, setProductsInRoom] = useState([]);
    const [room, setRoom] = useState([]);
    const [categoriesInRoom, setCategoriesInRoom] = useState([]);
    //api call first
    const getData = async () => {
        await axios
            .get(`/guest/room/products/${roomId}`)
            .then((res) => setProductsInRoom(res.data))
            .catch((err) => console.log(err));
        await axios
            .get(`/guest/room/${roomId}`)
            .then((res) => setRoom(res.data))
            .catch((err) => console.log(err));
        await axios
            .get(`/guest/room/categories/${roomId}`)
            .then((res) => setCategoriesInRoom(res.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <Header />
            <div className="page-room-content row">
                <div className="page-room-title">
                    <label>{room.roomName}</label>
                </div>
                <div className="col-sm-4 col-lg-3  col-xl-2 list-category-by-room">
                    <ListCategoryInRoom categoriesInRoom={categoriesInRoom} inRoom={'inRoom'} />
                </div>
                <div className="col-sm-8 col-lg-9  col-xl-10 banner-room">
                    <Banner />
                </div>
                <div className="select-sort">
                    <ComboBoxSort />
                </div>
                <div className="list-product-by-room">
                    <ListProductByCategory listProduct={productsInRoom} />
                </div>
            </div>
        </div>
    );
}
