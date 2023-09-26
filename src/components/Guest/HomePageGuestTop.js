import React, { useCallback, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './css/HomePageGuestTop.css'
import ListCategory from './ListCategory';
export default function HomePageGuestTop({hide,guestOrUser}) {
    const onMouseEnterBtnProduct=useCallback((e)=>{
            document.getElementById('list-category-header').classList.add('list-category-header-new')

    },[])
    const onMouseLeaveBtnProduct=useCallback((e)=>{
        document.getElementById('list-category-header').classList.remove('list-category-header-new')
   },[])
    useEffect(()=>{
        if(hide){
            document.getElementById('homepage-top').classList.add('homepage-top-new')
            document.getElementById('all-product').classList.add('all-product-new')
            const navigas = [...document.getElementsByClassName('naviga')]
            navigas.map((naviga)=>{
                naviga.classList.add('naviga-new')
            })
            if(guestOrUser==true){
                document.getElementById('list-room').classList.add('list-room-new')
            }
        }
    })
  return (
    <>
        <div id='homepage-top' className='homepage-top row'>
            <div className='col-1'>
            </div>
            <div className='col-10 row'>
                <div id='parent-all-product' className='col-3' onMouseEnter={onMouseEnterBtnProduct} onMouseLeave={onMouseLeaveBtnProduct}>
                    <div id='all-product' className='all-product '>    
                        SẢN PHẨM
                        &nbsp;
                        <svg id='chev-down' xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>  
                    <div id='list-category-header' className='list-category-header'>
                            <ListCategory />
                    </div> 
                </div>
                <div className='col-9 row info-homepage-top'>
                    <div  className='col-4 naviga'>
                        BỘ SƯU TẬP
                    </div>
                    <div className='col-4 naviga'>
                        THIẾT KẾ NỘI THẤT
                    </div>
                    <div className='col-4 naviga'>
                        NGUỒN CẢM HỨNG
                    </div>
                </div>
            </div>
            <div className='col-1'>
            </div>
        </div>
    </>
    
  )
}
