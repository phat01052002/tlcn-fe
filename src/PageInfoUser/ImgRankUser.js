import React from 'react';
import silver from './img/silver.png';
import gold from './img/gold.png';
import platinum from './img/platinum.png';
import diamond from './img/diamond.png';
import bronze from './img/bronze.png';
export default function ImgRankUser({ rankUser }) {
    if ((rankUser == 'BRONZE')) {
        return (
            <div className='div-rank-user'>
                <img className="img-rank-user" src={bronze} />
                <label> Thành viên đồng </label>
            </div>
        );
    }
    if ((rankUser == 'SILVER')) {
        return (
            <div className='div-rank-user'>
                <img className="img-rank-user" src={silver} />
                <label> Thành viên bạc </label>
            </div>
        );
    }
    if ((rankUser == 'GOLD')) {
        return (
            <div className='div-rank-user'>
                <img className="img-rank-user" src={gold} />
                <label> Thành viên vàng </label>
            </div>
        );
    }
    if ((rankUser == 'PHATINUM')) {
        return (
            <div className='div-rank-user'>
                <img className="img-rank-user" src={platinum} />
                <label> Thành viên bạch kim </label>
            </div>
        );
    }
    if ((rankUser == 'DIAMOND')) {
        return (
            <div className='div-rank-user'>
                <img className="img-rank-user" src={diamond} />
                <label> Thành viên kim cương </label>
            </div>
        );
    }
}
