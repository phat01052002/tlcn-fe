import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Room from './Room'
import './css/Room.css'

export default function ListRoom({onMouseOverRoom}) {
  const [listRoom,setListRoom]=useState([])
  useEffect(()=>{
    axios.get('/room')
    .then(res=>setListRoom(res.data))
    .catch(error => console.log(error));
  },[])
  return (
    <div className='lst-room'>
        {listRoom.map((room)=><Room key={room.id} room={room} onMouseOverRoom={onMouseOverRoom}/>)}
    </div>
  )
}
