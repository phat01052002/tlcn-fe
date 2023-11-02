import React from 'react';
import ProductInsuranse from './ProductInsuranse';
import ProductReview from './ProductReview';
import ProductTransport from './ProductTransport';

export default function BenhindProductDetail({ currentBehind, productId }) {
    if (currentBehind == 1) {
        return (
            <div>
                <ProductReview productId={productId} />
            </div>
        );
    }
    if (currentBehind == 2) {
        return (
            <div>
                <ProductInsuranse />
            </div>
        );
    }
    if (currentBehind == 3) {
        return (
            <div>
                <ProductTransport />
            </div>
        );
    }
}
