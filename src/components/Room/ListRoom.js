import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Room from './Room'
import './Room.css'

export default function ListRoom() {
    const [listRoom, setListRoom] = useState([]);
    useEffect(() => {
        axios
            .get('/guest/room')
            .then((res) => setListRoom(res.data))
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="listroom">
            {listRoom.map((room) => (
                <Room room={room}/>
            ))}
        </div>
    );
}
