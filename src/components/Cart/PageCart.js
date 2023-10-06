import React from 'react'
import './css/PageCart.css'
import ProductInCart from './ProductInCart'
export default function PageCart({listProduct}) {
  return (
    <div>
        {listProduct.map((productId)=><ProductInCart key={productId} productId={productId}/>)}
    </div>
  )
}
