import React from 'react'
import './css/Room.css'
export default function Room({key,room,onMouseOverRoom}) {
  return (
    <div className='room' onMouseOver={()=>onMouseOverRoom(room.roomId)}>
        {room.roomName}
    </div>
  )
}
