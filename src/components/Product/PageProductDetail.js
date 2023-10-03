import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HeaderGuest from '../Header/HeaderGuest'
import './css/PageProductDetail.css'
import "bootstrap/dist/css/bootstrap.css";
import BenhindProductDetail from './BenhindProductDetail'

export default function PageProductDetail() {
  const {productId}=useParams()
  //the product for this page
  const [product,setProduct]=useState([])
  //the number for user to buy or add to card
  const [number,setNumber]=useState(1)
  //the current behind product detail (1:review 2:insuranse 3:transport)
  const [currentBehind,setCurrentBehind]=useState(1)
  //this vars to set color behind product detail
  //function format price
  const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  })
  //handle buy now
  const handleClickBuyNow=useCallback((e)=>{
    console.log("buynow")
  },[])
  //handle add tocart
  const handleClickAddToCart=useCallback((e)=>{
    console.log("Addtocart")
  },[])
  //handle Decrease number
  const handleClickDecrease=useCallback((e)=>{
      if(document.getElementById('number-product').value>1)
          setNumber((prev)=>prev-=1)
  },[])
  //handle Increase number
  const handleClickIncrease=useCallback((e)=>{
      setNumber((prev)=>prev+=1)
  },[])
  //handle click review
  const handleClickReview=useCallback((e)=>{
    setCurrentBehind(1)
    const review=document.getElementById('review')
    const insuranse=document.getElementById('insuranse')
    const transport=document.getElementById('transport')
    review.classList.add('behind-productdetail-current')
    insuranse.classList.remove('behind-productdetail-current')
    transport.classList.remove('behind-productdetail-current')
  },[])
  //handle click insuranse
  const handleClickInsuranse=useCallback((e)=>{
    setCurrentBehind(2)
    const review=document.getElementById('review')
    const insuranse=document.getElementById('insuranse')
    const transport=document.getElementById('transport')
    review.classList.remove('behind-productdetail-current')
    insuranse.classList.add('behind-productdetail-current')
    transport.classList.remove('behind-productdetail-current')
  },[])
  //handle click transport
  const handleClickTransport=useCallback((e)=>{
    setCurrentBehind(3)
    const review=document.getElementById('review')
    const insuranse=document.getElementById('insuranse')
    const transport=document.getElementById('transport')
    review.classList.remove('behind-productdetail-current')
    insuranse.classList.remove('behind-productdetail-current')
    transport.classList.add('behind-productdetail-current')
  },[])
  //get product by Id
  useEffect(()=>{
    axios.get(`/product/${productId}`)
    .then(res=>setProduct(res.data))
    .then(err=> console.log(err))
  },[])
  return (
    <div>
       <HeaderGuest guestOrUser={false}/>
        <div className='row'>
          <div className='col-1'></div>
          <div className='col-10 row product-detail'>
            <div className='col-7'>
              <img className='image-product' src={product.image}></img>
            </div>
            <div className='col-5 info-product'>
                <h2>  {product.name}</h2>
                <br/>
                <h6>{formatter.format(product.price)}</h6>
                <br/>
                <div>
                  <h5>Vật liệu: </h5>
                  {product.material}
                </div>
                <br/>
                <div>
                  <h5>Kích thước: </h5>
                  {product.size}
                </div>
                <br/>
                <div className='btn-productdetail row'>
                  <div className='col-4 chose-number'>
                      <button className='decrease-btn' onClick={handleClickDecrease}>-</button>
                      <input id='number-product' className='number-product' value={number}></input>
                      <button className='increase-btn' onClick={handleClickIncrease}>+</button>
                  </div>
                  <div className='col-4 buynow'>
                    <button className='btn-buynow' onClick={handleClickBuyNow}> Mua Ngay</button>
                  </div>
                  <div className='col-4 addtocart'>
                    <button className='btn-addtocart' onClick={handleClickAddToCart}>Thêm Vào Giỏ</button>
                  </div>
                </div>
                <br/>
                Liên hệ tư vấn và đặt mua: 0865762255
                <div className='behind-productdetail-content'>
                  <span id='review' className='behind-productdetail behind-productdetail-current review-product' onClick={handleClickReview}>Đánh Giá</span>
                  <span id='insuranse' className='behind-productdetail insuranse-product' onClick={handleClickInsuranse}>Bảo Hành</span>
                  <span id='transport' className='behind-productdetail transport-product' onClick={handleClickTransport}>Vận Chuyển</span>
                </div>
                <br/>
                <br/>
                <br/>
                <BenhindProductDetail currentBehind={currentBehind}/>
            </div>
          </div>
          <div className='col-1'></div>
        </div>
      <button className='btn-mess'>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-messenger icon-chat" viewBox="0 0 16 16">
                <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
                </svg>
      </button>
    </div>
  )
}
