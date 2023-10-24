import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { changeRole, useStore } from '../Store';
export default function PageAdmin() {
    const [globalState, dispatch] = useStore();
    const { numberCart, roleState } = globalState; //numberCart is state get from StoreF
    //user
    const [admin, setAdmin] = useState(null);
    //check admin fist
    const checkAdmin = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/check',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const request = await axios.request(config);
            dispatch(changeRole('admin'));
        } catch {
            window.location = '/login';
        }
    };
    const getAdmin = () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/findByName',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setAdmin(res.data));
        } catch {
            window.location = '/login';
        }
    };
    useEffect(() => {
        checkAdmin();
    }, []);
    useEffect(() => {
        if (roleState === 'admin') getAdmin();
    }, [roleState]);
    const getName = () => {
        if (admin) {
            return admin.name;
        } else {
            return '';
        }
    };
    return <div>{getName()}</div>;
}
