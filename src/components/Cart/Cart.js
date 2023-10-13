import React, { useCallback, useEffect, useState } from 'react'
import './css/PageCart.css'
import ProductInCart from './ProductInCart'
export default function PageCart({listProduct,listCountProduct,reloadPageCart}) {
  //format
  const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  })
  //var price all
  const [priceAll,setPriceAll]=useState(0)
  /////
  const handleCheck=useCallback((productId,price,check,chageChecked)=>{
    if(!check){
      setPriceAll((prev)=>prev+=parseInt(localStorage.getItem(productId))*price)
      chageChecked()
    }
    else{
      setPriceAll((prev)=>prev-=parseInt(localStorage.getItem(productId))*price)
      chageChecked()
    }
  },[])
  useEffect(()=>{
    document.getElementById('input-price-all').style.pointerEvents='none'
  },[])
  //delete page cart function
  const handleClickDeletePageCart=useCallback((e)=>{
    document.getElementById('page-cart').classList.remove('page-cart-visible')
    document.body.style.pointerEvents='auto'
    document.getElementById('over-cart').style.visibility = 'hidden'
  },[])
  //when decrease count
  const decreaseCount = useCallback(async(productId,price,check,decrease)=>{
    if(check && parseInt(localStorage.getItem(productId))>=1){
      setPriceAll((prev)=>prev-=1*price)
    }
    await decrease()
    //reload page cart when delete item
    if(parseInt(localStorage.getItem(productId)) == 0){
      localStorage.removeItem(productId)
      await reloadPageCart()
    }
  },[])
  //when increase count
  const increaseCount = useCallback((productId,price,check,increase)=>{
    increase()
    if(check){
      setPriceAll((prev)=>prev+=1*price)
    }
  },[])

  //when click delete item
  const deleteItem = useCallback(async(productId,price,check)=>{
    if(check){
      await setPriceAll((prev)=>prev-=parseInt(localStorage.getItem(productId))*price)
    }
    localStorage.removeItem(productId)
    await reloadPageCart()
  },[])
  return (
    <div className='page-cart'>
      <div className='delete-page-cart' onClickCapture={handleClickDeletePageCart}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
      </div>
      <h5>GIỎ HÀNG</h5>
        {listProduct.map((productId)=><ProductInCart key={productId} productId={productId} handleCheck={handleCheck} increaseCount={increaseCount} decreaseCount={decreaseCount} deleteItem={deleteItem}/>)}
      <div className='buyAll-in-cart'>
        <input id='input-price-all' value={formatter.format(priceAll)}></input>
        <button>Thanh Toán</button>
      </div>
    </div>
  )
}
