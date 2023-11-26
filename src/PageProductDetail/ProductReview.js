import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '../Store';
import Review from './Review';

export default function ProductReview({ productId }) {
    const [globalState, dispatch] = useStore();
    const { roleState, user } = globalState;
    const [review, setReview] = useState('');
    const [listReview, setListReview] = useState([]);

    const handleEnterInputReview = useCallback(async (e, user, productId, review) => {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == '13') {
            try {
                const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                let data = review;
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `/user/saveReview/${user.userId}/${productId}`,
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
                            getReview();
                        }
                    })
                    .catch();
                setReview('');
            } catch (e) {}
        }
    }, []);
    const renderInputChat = (roleState) => {
        if (roleState == 'guest') {
            return <div>Vui lòng đăng nhập để thêm đánh giá</div>;
        } else {
            return (
                <div className="row">
                    <div className="col-1 div-input-chat">
                        <div>
                            <img className="user-img-review" src={user.image}></img>
                        </div>
                    </div>
                    <div className="col-11">
                        <input
                            type="text"
                            onKeyDown={(e) => handleEnterInputReview(e, user, productId, review)}
                            className="input-chat"
                            placeholder="Thêm bình luận"
                            value={review}
                            onChange={(e) => {
                                setReview(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
            );
        }
    };
    //
    const getReview = () => {
        axios
            .get(`/guest/reviewByProduct/${productId}`)
            .then((res) => {
                setListReview(res.data);
            })
            .catch();
    };
    //
    useEffect(() => {
        getReview();
    }, []);
    return (
        <div>
            <div className="review-input-chat">{renderInputChat(roleState)}</div>
            <div className="review-content">
                {listReview.map((review) => (
                    <Review key={review.reviewId} review={review} getReview={getReview} />
                ))}
            </div>
        </div>
    );
}
