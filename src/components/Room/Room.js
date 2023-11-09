import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Room({ room }) {
    const nav = useNavigate();
    const handleClickRoom = useCallback(() => {
        nav(`/room/${room.roomId}`);
    }, []);
    return (
        <div className="room" onClick={handleClickRoom}>
            {room.roomName}
        </div>
    );
}
