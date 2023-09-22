import React, { useEffect, useState } from 'react'
import logo from '../logo.svg'
import './HeaderGuest.css'
import "bootstrap/dist/css/bootstrap.css";
import HomePageGuestTop from '../Guest/HomePageGuestTop';
let guestOrUsers;
export default function HeaderGuest({guestOrUser}) {
    const [headerHide,setHeaderHide]=useState(false)
    guestOrUsers=guestOrUser
    useEffect(()=>{
        const handleScroll=()=>{
          if(window.scrollY>=250){
            setHeaderHide(true)
            if(guestOrUsers){
                document.getElementById('list-room-view').classList.add('list-room-view-new')
                document.getElementById('navigaCategory').classList.remove('navigaCategory-new')
            }
          }
          if(window.scrollY===0){
            setHeaderHide(false)
            if(guestOrUsers)
            {
                document.getElementById('list-room-view').classList.remove('list-room-view-new')
            }
          }
        }
        window.addEventListener('scroll',handleScroll)    
        return function cleanup(){
            window.removeEventListener('scroll',handleScroll)
        }
      },[])
    if(!headerHide){
        return (
            <>
            <div className='header-guest row'>
                <div className='col-1'>
                </div>
                <div className='col-1'>
                <a href='/guest'>
                        <img src={logo} className='logo-img'></img>
                    </a>
                </div>
                <div className='col-5 search'>
                    <span className='icon-search'>
                        <button className='btn btn-search'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        </button>
                    </span>
                    <input className='form-control input-search' placeholder='Tìm kiếm sản phẩm'></input> 
                
                </div>
                <div className='login-btn col-2'>
                    <a className='login' href='/login'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg>
                        &nbsp;
                        Đăng nhập
                    </a>
                </div>
                <div className='cart-btn col-2'>
                    <a className='cart' href='/cart'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                    </svg>
                        &nbsp;

                        Giỏ hàng
                    </a>
                </div>
                <div className='col-1'></div>
            </div>
            <HomePageGuestTop hide={false} guestOrUser={guestOrUser}/>
            </>
          )
    }
    else{
        return(
            <div className='header-guest-new'>
            <div className='row'>
                <div className='col-1'>
                </div>
                <div className='col-1'>
                <a href='/guest'>
                        <img src={logo} className='logo-img'></img>
                    </a>
                </div>
                <div className='col-5 search'>
                    <span className='icon-search'>
                        <button className='btn btn-search'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        </button>
                    </span>
                    <input className='form-control input-search' placeholder='Tìm kiếm sản phẩm'></input> 
                
                </div>
                <div className='login-btn col-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    &nbsp;
                    <a className='login' href='/login'>Đăng nhập</a>
                </div>
                <div className='cart-btn col-2'>
                    <a className='cart' href='/cart'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                    </svg>
                        &nbsp;
                        Giỏ hàng
                    </a>
                </div>
                <div className='col-1'></div>
            </div>
            <HomePageGuestTop hide={true} guestOrUser={guestOrUser}/>
        </div>
        )
    }

}
