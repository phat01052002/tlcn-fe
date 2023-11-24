import axios from 'axios';
import React, { useCallback } from 'react';
import { useStore } from '../Store';

export default function Response({ response, getResponseReview }) {
    const [globalState, dispatch] = useStore();
    const { user } = globalState;
    const handleDelete = useCallback(async (user) => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `/user/deleteResponseReview/${response.responseReviewId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios
                .request(config)
                .then((res) => {
                    if (res.status == 200) {
                        getResponseReview(user);
                    }
                })
                .catch();
        } catch (e) {}
    }, []);
    return (
        <div className="row  margin-top-1rem">
            <div className="col-1 response-img height-3rem">
                <img src={response.image}></img>
            </div>
            <div className="col-11 review-product-content">
                <div className="review-product-user-name">
                    {user ? (user.userId == response.userId ? 'Bạn' : response.name) : response.name}:
                </div>
                <div>
                    <label>{response.content}</label>
                </div>
                <span>
                    <label>Thích</label>
                    {user.userId == response.userId ? <label onClick={()=>handleDelete(user)}>Xoá</label> : null}
                    &nbsp; &nbsp;
                    {response.date.substr(0, 10)}
                </span>
            </div>
        </div>
    );
}
