import React, { useCallback, useEffect, useState } from 'react'
import logo from '../logo.svg'
import './HeaderGuest.css'
import "bootstrap/dist/css/bootstrap.css";
import ListSearch from '../Search/ListSearch';
import ListCategory from '../Guest/ListCategory';
import PageCart from '../Cart/PageCart';
import { isDisabled } from '@testing-library/user-event/dist/utils';
export default function HeaderGuest({}) {
    //list product in cart
    const [listProduct,setListProduct] = useState([])
    //count product in cart
    const [listCountProduct,setListCountProduct] =useState([])
    //value input
    const [inputSearch,setInputSearch] =useState("")
    //input search onChange
    const handleChangeInputSearch=useCallback((e)=>{
        setInputSearch(e.target.value)
    },[])
    //hide the cart page
        

    //handle mouse move all product and move leave
    const handleMouseMoveAllProduct=useCallback((e)=>{
        document.getElementById('listcategory').classList.add('listcategory-visible')
        document.getElementById('listcategory').classList.remove('listcategory-hidden')
    },[])

    const handleMouseLeaveAllProduct=useCallback((e)=>{
        document.getElementById('listcategory').classList.remove('listcategory-visible')
        document.getElementById('listcategory').classList.add('listcategory-hidden')
    },[])
     //click design
    const handleClickDesign=useCallback((e)=>{
    window.location='/design'
    },[])
    //Click cart
    const handleClickCart=useCallback((e)=>{
        /////
        const pageCart =document.getElementById('page-cart')
        ////
       pageCart.classList.add('page-cart-visible')
        setListProduct([])
        for(let i=0;i< localStorage.length;i++){
            setListProduct((prev)=>[localStorage.key(i),...prev])
        }

        setListCountProduct([])
        for(let i=0;i< localStorage.length;i++){
            setListCountProduct((prev)=>[localStorage.getItem(localStorage.key(i)),...prev])
        }
        document.body.style.pointerEvents='none'
        ////
        const overCart=document.getElementById('over-cart')
        ////
        pageCart.style.pointerEvents='auto'
        overCart.style.visibility = 'visible'
        overCart.style.pointerEvents='auto'
        overCart.addEventListener('click',()=>{
            pageCart.classList.remove('page-cart-visible')
            overCart.style.visibility = 'hidden'
            document.body.style.pointerEvents='auto'
        })
        pageCart.addEventListener('click',(e)=>{
            e.stopPropagation();
        })

    })
    return(
        <div className='header'>
            <div className='row top-header'>
                <div className='col-4 search'>
                    <input className='input-search form-control' value={inputSearch} onChange={handleChangeInputSearch}></input>
                    <span className='icon-search'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    </span>
                    <ListSearch inputSearch={inputSearch}/>
                </div>
                <div className='col-6'></div>
                <div className='col-2 login'>
                    <a href='/login'>Đăng nhập</a>
                </div>
            </div>
            <div className='row bottom-header'>
                <div className='col-1'>
                    <a href='/guest'>
                        <img src={"https://i.pinimg.com/originals/69/34/73/693473a49f5048dd83077eb82b4513f9.jpg"} className='logo-img'></img>
                    </a>
                </div>
                <div className='col-8 naviga-header'>
                    <span onMouseMove={handleMouseMoveAllProduct} onMouseLeave={handleMouseLeaveAllProduct}>
                        SẢN PHẨM
                        &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <div id='listcategory' className='listcategory listcategory-hidden'>
                            <ListCategory />
                        </div>
                    </span>
                    <span onClick={handleClickDesign}>THIẾT KẾ NỘI THẤT</span>
                    <span>NGUỒN CẢM HỨNG</span>
                </div>    

                <div className='col-1'></div>
                <div className='col-2 cart' onClick={handleClickCart}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                &nbsp;
                Giỏ hàng
                </div>
            </div>
            <div id='over-cart'>
                <div id='page-cart' className='page-cart-hidden'>
                    <PageCart listProduct={listProduct} listCountProduct={listCountProduct}/>
                </div>
            </div>
        </div>
    )
}
