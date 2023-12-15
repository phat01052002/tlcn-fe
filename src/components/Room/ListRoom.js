import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HEADER_API } from '../../Store/Contants';
import Room from './Room';
import './Room.css';

export default function ListRoom() {
    const [listRoom, setListRoom] = useState([]);
    useEffect(() => {
        axios.get(`${HEADER_API}/guest/room`).then((res) => {
            if (res.data == null) {
                window.location = '/notfound';
            }
            setListRoom(res.data);
        });
    }, []);
    return (
        <div className="listroom">
            {listRoom.map((room) => (
                <Room key={room.roomId} room={room} />
            ))}
        </div>
    );
}
