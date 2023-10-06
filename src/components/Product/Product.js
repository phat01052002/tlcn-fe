import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderGuest from '../Header/HeaderGuest'
import './css/Product.css'
export default function Product({key,product}) {
  const naviga=useNavigate()
  //format
  const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  })
  //add to cart
  const handleClickAddToCart=useCallback((productId)=>{
    if(localStorage.getItem(productId)){
      try{
        localStorage.setItem(productId,parseInt(localStorage.getItem(productId))+1)
      }
      catch(e){
        console.log(e)
      }
    }
    else{
      localStorage.setItem(productId,1)
    }
  },[])
  //handle click product
  const handleClickProduct=useCallback((productId)=>{
    var nav=`/productdetail/${productId}`
    naviga(nav)
  },[])
  return (
    <div className='product'>
        <div className='product-content'>
            <img className='img-product' src={product.image} onClick={()=>handleClickProduct(product.productId)}/>
            <br/>
            {formatter.format(product.price)}
            <br/>
            <br/>
            {product.name}
            <br/>
            <br/>
            <div className='product-content'>
              <button className='btn-addtocart-product' onClick={()=>handleClickAddToCart(product.productId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                  </svg>
                  &nbsp;
                  Thêm vào giỏ
              </button>
            </div>
        </div>
    </div>
  )
}
