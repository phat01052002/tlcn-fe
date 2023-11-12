import React from 'react';
import { changeClientStomp, changeMessages, changeNumberMessages, useStore } from '../../Store';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useState } from 'react';
import { useEffect } from 'react';
import ItemChat from './ItemChatClient';
import { useCallback } from 'react';

export default function ContentChat({ role }) {
    //
    const [globalState, dispatch] = useStore();
    const { user, messages, clientStomp } = globalState;
    const [message, setMessage] = useState('');
    //
    const sendMessageEnter = (e) => {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == '13') {
            sendMessage();
        }
    };
    //
    const sendMessage = async () => {
        if (message.trim() && message != '') {
            const chatMessage = {
                nickname: role == 'user' ? user.name : 'Admin',
                content: message,
            };
            await clientStomp.send(
                `/app/chat/${role == 'user' ? 'UserToAdmin' : 'AdminToUser'}`,
                {},
                JSON.stringify(chatMessage),
            );
            dispatch(changeMessages(chatMessage));
            setMessage('');
        }
    };
    return (
        <div id="content-chat" className="content-chat hidden">
            <div className="tittle">Trò chuyện</div>
            <div className="chat-body">
                {messages.map((message, index) => (
                    <ItemChat key={index} message={message} user={user} role={role} />
                ))}
            </div>
            <span className="input-message">
                <input
                    placeholder="Nhập gì đó"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={sendMessageEnter}
                ></input>
                <svg
                    onClickCapture={sendMessage}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="40"
                    fill="currentColor"
                    class="bi bi-send"
                    viewBox="0 0 16 16"
                >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
            </span>
        </div>
    );
}
