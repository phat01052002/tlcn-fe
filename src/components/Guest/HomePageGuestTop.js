import React, { useCallback, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './css/HomePageGuestTop.css'

import ListRoomHeader from './ListRoomHeader';
import ListRoom from './ListRoom';
export default function HomePageGuestTop({hide}) {
    const [roomId,setRoomId]=useState(0)

    const onMouseOverRoom=useCallback((roomId)=>{
        setRoomId(roomId)
    },[])
    const onClickBtnProduct=useCallback((e)=>{
        if(window.getComputedStyle(document.getElementById('list-room-view')).visibility !== "hidden")
        {
            
        }
        else if(window.getComputedStyle(document.getElementById('list-room-view')).visibility === "hidden"&&
                 window.getComputedStyle(document.getElementById('list-room-header')).visibility === "hidden"){
            document.getElementById('list-room-header').classList.add('list-room-header-new')

        }
        else{
            document.getElementById('list-room-header').classList.remove('list-room-header-new')

        }
    },[])
    useEffect(()=>{
        if(hide){
            document.getElementById('homepage-top').classList.add('homepage-top-new')
            document.getElementById('all-product').classList.add('all-product-new')
            const navigas = [...document.getElementsByClassName('naviga')]
            navigas.map((naviga)=>{
                naviga.classList.add('naviga-new')
            })
            document.getElementById('list-room').classList.add('list-room-new')
        }
    })
    
  return (
    <>
        <div id='homepage-top' className='homepage-top row'>
            <div className='col-2'>
            </div>
            <div className='col-2'>
                <div id='all-product' className='all-product ' onClick={onClickBtnProduct}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list list-all-product" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    SẢN PHẨM
                </div>  
                <div id='list-room-header' className='list-room-header'>
                        <br/>
                        <ListRoom onMouseOverRoom={onMouseOverRoom}/>
                    </div> 
            </div>
            <div className='col-6 info-homepage-top row'>
                <div  className='col-4 naviga'>
                    Best seller
                </div>
                <div className='col-4 naviga'>
                    Giảm giá
                </div>
                <div className='col-4 naviga'>
                    Blog
                </div>
            </div>
            <div className='col-2'>
            </div>
        </div>
    </>
    
  )
}
