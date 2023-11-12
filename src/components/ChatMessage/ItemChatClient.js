import React from 'react';

export default function ItemChat({ message, user, role }) {
    const setLocationOfItem = () => {
        if (role == 'admin' && message.nickname == 'Admin') {
            return 'right';
        }
        if (message.nickname != user.name) {
            return 'left';
        } else {
            return 'right';
        }
    };
    return (
        <div className={`chat-item ${setLocationOfItem()}`}>
            <div className="chat-item-nickname"> {message.nickname != user.name ? message.nickname : 'Bạn'}:</div>
            <div className="chat-item-content">
                <label>{message.content}</label>
            </div>
        </div>
    );
}
