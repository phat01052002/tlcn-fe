import React from 'react'
import './css/Room.css'
export default function Room({key,room}) {
  return (
    <div className='room'>
        {room.roomName}
    </div>
  )
}
