import React, { useCallback } from 'react'
import './css/PageCart.css'
import ProductInCart from './ProductInCart'
export default function PageCart({listProduct,listCountProduct}) {
  console.log(listCountProduct)
  //delete page cart function
  const handleClickDeletePageCart=useCallback((e)=>{
    document.getElementById('page-cart').classList.remove('page-cart-visible')
    document.body.style.pointerEvents='auto'
    document.getElementById('over-cart').style.visibility = 'hidden'
  },[])
  return (
    <div>
      <div className='delete-page-cart' onClickCapture={handleClickDeletePageCart}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
      </div>
      <h5>GIỎ HÀNG</h5>
        {listProduct.map((productId)=><ProductInCart key={productId} productId={productId}/>)}
    </div>
  )
}
