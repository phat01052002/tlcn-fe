import { async } from '@firebase/util';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { notifyWarningPleaseLogin } from '../components/NotificationInPage/NotificationInPage';
import { useStore } from '../Store';
import Response from './Response';

export default function Review({ review, getReview }) {
    const [globalState, dispatch] = useStore();
    const { user } = globalState;
    const [closeResponse, setCloseResponse] = useState(false);
    const [response, setResponse] = useState('');
    const [listResponse, setListResponse] = useState([]);
    const handleDeleteReview = useCallback(async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `/user/deleteReview/${review.reviewId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios
                .request(config)
                .then((res) => {
                    if (res.status == 200) {
                        getReview();
                    }
                })
                .catch();
        } catch (e) {}
    }, []);
    //
    const handleClickResponse = useCallback((user, closeResponse) => {
        if (user.username != '') {
            if (closeResponse) {
                document.getElementById(`response-${review.reviewId}`).classList.add('hidden');
                setCloseResponse(false);
            } else {
                getResponseReview(user);
                document.getElementById(`response-${review.reviewId}`).classList.remove('hidden');
                setCloseResponse(true);
            }
        } else {
            notifyWarningPleaseLogin();
        }
    }, []);
    //
    const getResponseReview = (user) => {
        if (user.length != 0) {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/user/getResponseReview/${review.reviewId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios
                .request(config)
                .then((res) => setListResponse(res.data))
                .catch();
        }
    };

    //
    const handleEnterResponseReview = useCallback(async (e, response, user) => {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == '13') {
            try {
                const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                let data = response;
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `/user/saveResponseReview/${user.userId}/${review.reviewId}`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'text/plain',
                    },
                    data: data,
                };
                await axios
                    .request(config)
                    .then((res) => {
                        if (res.status == 200) {
                            getResponseReview(user);
                        }
                    })
                    .catch();
                setResponse('');
            } catch (e) {}
        }
    }, []);
    useEffect(() => {
        getResponseReview(user);
    }, [user]);
    return (
        <div className="row review-div">
            <div className="col-1 div-input-chat">
                <div>
                    <img className="user-img-review" src={review.image}></img>
                </div>
            </div>
            <div className="col-11 review-product-content">
                <div className="review-product-user-name">
                    {user ? (user.userId == review.userId ? 'Bạn' : review.name) : review.name} :
                </div>
                <div>
                    <label>{review.content}</label>
                </div>
                <span>
                    <label>Thích</label>
                    {
                        <label onClick={() => handleClickResponse(user, closeResponse)}>
                            Phản hồi({listResponse.length == 0 ? null : listResponse.length})
                        </label>
                    }
                    {user.userId == review.userId ? <label onClick={handleDeleteReview}>Xoá</label> : null}
                    &nbsp; &nbsp;
                    {review.date.substr(0, 10)}
                </span>
                <div id={`response-${review.reviewId}`} className="hidden">
                    <div className="response row">
                        <div className="col-1 response-img height-3rem">
                            <img src={user.image}></img>
                        </div>
                        <div className="col-11 response-input height-3rem">
                            <input
                                onKeyDown={(e) => handleEnterResponseReview(e, response, user)}
                                placeholder="Thêm bình luận"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    {listResponse.map((response) => (
                        <Response key={response.reponseReviewId} response={response} getResponseReview={getResponseReview} />
                    ))}
                </div>
            </div>
        </div>
    );
}
