import React from 'react';

export default function ItemChatAdmin({ message, userFocus }) {
    const returnMessage = () => {
        if (message.nickname != 'admin') {
            if (message.userId == userFocus) {
                return (
                    <div className="left">
                        <div className="chat-item-nickname">{message.nickname}</div>
                        <div className="chat-item-content">
                            <label>{message.content}</label>
                        </div>
                        <br />
                    </div>
                );
            }
            return null;
        } else {
            if (message.userId == userFocus) {
                return (
                    <div className="right">
                        <div className="chat-item-nickname">Bạn</div>
                        <div className="chat-item-content">
                            <label>{message.content}</label>
                        </div>
                        <br />
                    </div>
                );
            }
            return null;
        }
    };
    return <div>{returnMessage()}</div>;
}
