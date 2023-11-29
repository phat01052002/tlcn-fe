import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Room({ room }) {
    const handleClickRoom = useCallback(() => {
        window.location = `/room/${room.roomId}`;
    }, []);
    return (
        <div className="room" onClick={handleClickRoom}>
            {room.roomName}
        </div>
    );
}
