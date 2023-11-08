import React from 'react';

export default function ItemChat({ message, user }) {
    return (
        <div className="chat-item">
            {message.nickname}:{message.content}
        </div>
    );
}
