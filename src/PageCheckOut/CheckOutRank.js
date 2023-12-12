import React from 'react';

export default function CheckOutRank({ rankUser }) {
    if (rankUser == 'BRONZE') {
        return <div className='rank-info'>Thành viên đồng đã được giảm 1%</div>;
    }
    if (rankUser == 'SILVER') {
        return <div className='rank-info'>Thành viên bạc đã được giảm 2%</div>;
    }
    if (rankUser == 'GOLD') {
        return <div className='rank-info'>Thành viên vàng đã được giảm 3%</div>;
    }
    if (rankUser == 'PLATINUM') {
        return <div className='rank-info'>Thành viên bạch kim đã được giảm 4%</div>;
    }
    if (rankUser == 'DIAMOND') {
        return <div className='rank-info'>Thành viên kim cương đã được giảm 5%</div>;
    }
}
