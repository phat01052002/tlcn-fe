import React from 'react'

export default function Room({room}) {
    return (
        <div className="room">
            {room.roomName}
        </div>
    );
}
