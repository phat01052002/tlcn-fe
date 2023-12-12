import { Slider } from '@mui/material';
import React from 'react';

export default function UserPoint({ userPoint }) {
    if (userPoint <= 100) {
        return (
            <>
                <span className="user-point">
                    0
                    <Slider disabled defaultValue={userPoint} aria-label="Disabled slider" color="secondary" />
                    100
                </span>
                <div>Điểm hiện tại : {userPoint}</div>
                <div>Cần hơn 100 điểm để lên thành viên bạc</div>
            </>
        );
    } else if (userPoint <= 300) {
        return (
            <>
                <span className="user-point">
                    100
                    <Slider disabled defaultValue={(userPoint-100)/2} aria-label="Disabled slider" color="secondary" />
                    300
                </span>
                <div>Điểm hiện tại : {userPoint}</div>
                <div>Cần hơn 300 điểm để lên thành viên vàng</div>
            </>
        );
    } else if (userPoint <= 500) {
        return (
            <>
                <span className="user-point">
                    300
                    <Slider disabled defaultValue={(userPoint-300)/2} aria-label="Disabled slider" color="secondary" />
                    500
                </span>
                <div>Điểm hiện tại : {userPoint}</div>
                <div>Cần hơn 500 điểm để lên thành viên bạch kim</div>
            </>
        );
    } else if (userPoint <= 700) {
        return (
            <>
                <span className="user-point">
                    500
                    <Slider disabled defaultValue={(userPoint-500)/2} aria-label="Disabled slider" color="secondary" />
                    700
                </span>
                <div>Điểm hiện tại : {userPoint}</div>
                <div>Cần hơn 700 điểm để lên thành viên kim cương</div>
            </>
        );
    } else {
        return (
            <>
                <div>Điểm hiện tại : {userPoint}</div>
            </>
        );
    }
}
