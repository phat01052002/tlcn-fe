import React, { useCallback, useEffect, useState } from 'react'
import HeaderGuest from '../Header/HeaderGuest'
import ListRoom from './ListRoom'
import './css/PageGuest.css'
import ListCategoryByRoom from './ListCategoryByRoom'

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
      <div>
        <div id='list-room' className='list-room row' >
                <div className='col-1'></div>
                <div className='col-10 row' onMouseLeave={onMouseLeave}>
                  <div id='list-room-view' className='list-room-view col-3'>
                      <ListRoom onMouseOverRoom={onMouseOverRoom}/>
                  </div>
                  <div className='col-9'>
                    <div id='navigaCategory' className='navigaCategory'>
                        <ListCategoryByRoom roomId={roomId}/>
                    </div>
                    <img className='img-page' src='https://shinedesign.vn/wp-content/uploads/2021/06/km-san-se-noi-lo-voi-khach-hang-noi-that.jpg'></img>
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
    </div>

  )
}
