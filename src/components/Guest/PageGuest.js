import React, { useEffect, useState } from 'react'
import HeaderGuest from '../Header/HeaderGuest'
import ListRoom from './ListRoom'
import './css/PageGuest.css'

export default function PageGuest() {
  const [headerHide,setHeaderHide]=useState(false)
  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>=250){
        setHeaderHide(true)
      }
      if(window.scrollY==20){
        setHeaderHide(false)
      }

    }
    window.addEventListener('scroll',handleScroll)
  },[])
  return (
    <div>
      <HeaderGuest headerHide={headerHide}/>
      <div id='list-room' className='list-room row'>
            <div className='col-2'></div>
            <div className='list-room-view col-2'>
                <ListRoom/>
            </div>
            <div className='col-6'></div>
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
