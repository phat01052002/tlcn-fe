import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import { useStore } from '../Store';

export default function CheckOut() {
    const [globalState, dispatch] = useStore();
    const { roleState } = globalState;
    return (
        <div>
            <Header />
        </div>
    );
}
