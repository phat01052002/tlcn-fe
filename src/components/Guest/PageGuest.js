import React, { useCallback, useEffect, useState } from 'react'
import HeaderGuest from '../Header/HeaderGuest'
import ListRoom from './ListRoom'
import './css/PageGuest.css'
import ListCategory from './ListCategory'

export default function PageGuest() {
  const imgPage=['https://img4.thuthuatphanmem.vn/uploads/2020/12/25/hinh-anh-noi-that-trong-nha_115826496.jpg',
  'https://shinedesign.vn/wp-content/uploads/2021/06/km-san-se-noi-lo-voi-khach-hang-noi-that.jpg',
'https://img4.thuthuatphanmem.vn/uploads/2020/12/26/hinh-anh-noi-that-nha-biet-thu_052110332.jpg']


  const [headerHide,setHeaderHide]=useState(false)
  const [roomId,setRoomId]=useState(0)

  const onMouseOverRoom=useCallback((roomId)=>{
      document.getElementById('navigaCategory').classList.add('navigaCategory-new')
      setRoomId(roomId)
  },[])
  const onMouseLeave=useCallback((e)=>{
    document.getElementById('navigaCategory').classList.remove('navigaCategory-new')

  },[])
  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>=250){
        setHeaderHide(true)
        document.getElementById('list-room-view').classList.add('list-room-view-new')
        document.getElementById('navigaCategory').classList.remove('navigaCategory-new')

      }
      if(window.scrollY==0){
        setHeaderHide(false)
        document.getElementById('list-room-view').classList.remove('list-room-view-new')
      }

    }
    window.addEventListener('scroll',handleScroll)
  },[])
  return (
    <div>
      <HeaderGuest headerHide={headerHide}/>
        <div id='list-room' className='list-room row'>
              <div className='col-2'></div>
              <div id='list-room-view' className='list-room-view col-2'>
                  <ListRoom onMouseOverRoom={onMouseOverRoom}/>
              </div>
              <div className=' col-6'>
                <div id='navigaCategory' className='navigaCategory' onMouseLeave={onMouseLeave}>
                  <ListCategory roomId={roomId}/>
                </div>
                <img className='img-page' src='https://shinedesign.vn/wp-content/uploads/2021/06/km-san-se-noi-lo-voi-khach-hang-noi-that.jpg'></img>
              </div>
              <div className='col-2'></div>
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
