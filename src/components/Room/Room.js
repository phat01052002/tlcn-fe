import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Room({room}) {
    const nav=useNavigate()
    const handleClickRoom=useCallback(()=>{
        var navigate = `/room/${room.roomId}`;
        nav(navigate);
        window.location.reload();
    },[])
    return (
        <div className="room" onClick={handleClickRoom}>
            {room.roomName}
        </div>
    );
}
