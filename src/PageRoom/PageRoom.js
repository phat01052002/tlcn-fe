import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListProductByCategory from '../components/Category/ListProductByCategory';
import Header from '../components/Header/Header';
import './PageRoom.css';

export default function PageRoom() {
    const { roomId } = useParams();
    const [productsInRoom, setProductsInRoom] = useState([]);
    const [room, setRoom] = useState([]);
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
                <div className="combobox-sort">
                    <div className="sort-select">
                        <div>Phổ biến</div>
                        <div>Giảm giá</div>
                        <div>Giá thấp đến cao</div>
                        <div>Giá cao đến thấp</div>
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
                <div className="list-product-by-room">
                    <ListProductByCategory listProduct={productsInRoom} />
                </div>
            </div>
        </div>
    );
}
