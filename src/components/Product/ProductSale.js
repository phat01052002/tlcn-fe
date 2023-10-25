import React from 'react';

export default function ProductSale({ discount }) {
    return (
        <div>
            <label className="name-discount">{discount.discountName}</label>
        </div>
    );
}
