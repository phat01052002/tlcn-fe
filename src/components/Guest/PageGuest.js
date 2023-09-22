import React, { useCallback, useEffect, useState } from 'react'
import HeaderGuest from '../Header/HeaderGuest'
import ListRoom from './ListRoom'
import './css/PageGuest.css'
import ListCategoryByRoom from './ListCategoryByRoom'
import ListBestSellerProduct from './ListBestSellerProduct'

export default function PageGuest() {
  const imgPage=['https://img4.thuthuatphanmem.vn/uploads/2020/12/25/hinh-anh-noi-that-trong-nha_115826496.jpg',
  'https://shinedesign.vn/wp-content/uploads/2021/06/km-san-se-noi-lo-voi-khach-hang-noi-that.jpg',
'https://img4.thuthuatphanmem.vn/uploads/2020/12/26/hinh-anh-noi-that-nha-biet-thu_052110332.jpg']

  const [roomId,setRoomId]=useState(0)

  const onMouseOverRoom=useCallback((roomId)=>{
      document.getElementById('navigaCategory').classList.add('navigaCategory-new')
      setRoomId(roomId)
  },[])
  const onMouseLeave=useCallback((e)=>{
    document.getElementById('navigaCategory').classList.remove('navigaCategory-new')

  },[])
  return (
    <div>
      <HeaderGuest guestOrUser={true}/>
      <div id='content'>
        <div id='list-room' className='list-room row' >
                <div className='col-1'></div>
                <div className='col-10 row' onMouseLeave={onMouseLeave}>
                  <div id='list-room-view' className='list-room-view col-3'>
                      <ListRoom onMouseOverRoom={onMouseOverRoom}/>
                  </div>
                  <div className='col-9'>
                    <div id='navigaCategory' className='navigaCategory' onMouseLeave={onMouseLeave}>
                        <ListCategoryByRoom roomId={roomId}/>
                    </div>
                    <img className='img-page' src='https://shinedesign.vn/wp-content/uploads/2021/06/km-san-se-noi-lo-voi-khach-hang-noi-that.jpg'></img>
                  </div>
                </div>
                <div className='col-1'></div>
        </div> 
        <div  className='row product-bestSeller'>
          <div className='col-1'></div>
          <div className='col-10' id='product-bestSeller'>
              <h3>Sản Phẩm Bán Chạy</h3>
              <div className='list-product-bestSeller'>
                <ListBestSellerProduct/>
              </div>
          </div>
          <div className='col-1'></div>
        </div>  
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <button className='btn-mess'>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-messenger icon-chat" viewBox="0 0 16 16">
          <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
        </svg>
      </button>
  
    </div>

  )
}
