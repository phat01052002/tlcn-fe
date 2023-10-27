import React from 'react';
import Product from '../Product/Product';

export default function ListProductByCategory({ listProduct }) {
    if (listProduct != null) {
        return (
            <div>
                {listProduct.map((product) => (
                    <Product key={product.productId} product={product} />
                ))}
            </div>
        );
    } else {
        return null;
    }
}
