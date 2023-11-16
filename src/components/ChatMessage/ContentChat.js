import React from 'react';
import { changeClientStomp, changeMessages, changeNumberMessages, changeUserFocus, useStore } from '../../Store';
import { useState } from 'react';
import ItemChat from './ItemChatClient';
import { useRef } from 'react';
import ItemChatAdmin from './ItemChatAdmin';
import { useImperativeHandle } from 'react';

export default function ContentChat({ role }) {
    //
    const [globalState, dispatch] = useStore();
    const { user, messages, clientStomp, listUserIdChat, userFocus } = globalState;
    const [message, setMessage] = useState('');
    //
    const sendMessageEnter = (e) => {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == '13') {
            sendMessage();
        }
    };
    //
    const sendMessageEnterAdmin = (e) => {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == '13') {
            sendMessageAdmin();
        }
    };
    //
    const sendMessage = async () => {
        if (message.trim() && message != '') {
            const chatMessage = {
                nickname: user.name,
                content: message,
                userId: `${user.userId}`,
                userImage: user.image,
            };
            await clientStomp.send('/app/chat/UserToAdmin', {}, JSON.stringify(chatMessage));
            dispatch(changeMessages(chatMessage));
            setMessage('');
        }
    };
    const sendMessageAdmin = async () => {
        if (message.trim() && message != '') {
            const chatMessage = {
                nickname: 'admin',
                content: message,
                userId: `${userFocus}`,
            };
            await clientStomp.send(`/app/chat/AdminToUser/${userFocus}`, {}, JSON.stringify(chatMessage));
            dispatch(changeMessages(chatMessage));
            setMessage('');
        }
    };
    if (role == 'user') {
        return (
            <div id="content-chat" className="content-chat hidden">
                <div className="tittle">Bạn cần trợ giúp gì ?</div>
                <div className="chat-body">
                    {messages.map((message, index) => (
                        <ItemChat key={index} message={message} user={user} />
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
    const getIamge = (userId, messages) => {
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].userId == userId && messages[i].userImage) {
                return (
                    <img
                        id="item-chat-admin"
                        className={`img-user-chat-admin ${userId == userFocus ? 'onFocus' : null}`}
                        src={`${messages[i].userImage}`}
                    />
                );
            }
        }
        return null;
    };
    if (role == 'admin') {
        return (
            <div id="content-chat" className="content-chat hidden">
                <div id="list-user-chat">
                    {listUserIdChat.map((userId, index) => (
                        <span
                            className={`item-chat-admin`}
                            onClick={() => {
                                dispatch(changeUserFocus(userId));
                                if (userId == userFocus) {
                                    document.getElementById('item-chat-admin').classList.add('onFocus');
                                }
                            }}
                        >
                            {getIamge(userId, messages)}
                        </span>
                    ))}
                </div>
                <div className="chat-body-admin chat-body">
                    {messages.length != 0 ? (
                        messages.map((message, index) => (
                            <ItemChatAdmin key={index} message={message} userFocus={userFocus} />
                        ))
                    ) : (
                        <img
                            className="img-no-message"
                            src="https://cdn.dribbble.com/users/1275019/screenshots/3762906/no_message.png"
                        ></img>
                    )}
                </div>
                {userFocus ? (
                    <span className="input-message">
                        <input
                            placeholder="Nhập gì đó"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={sendMessageEnterAdmin}
                        ></input>
                        <svg
                            onClickCapture={sendMessageAdmin}
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
                ) : null}
            </div>
        );
    }
}
