import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './HomePageGuestTop.css'
import logo from '../logo.svg'
import ListRoom from './ListRoom';
export default function HomePageGuestTop() {
  return (
    <div className='homepage-top row'>
        <div className='col-2'>
        </div>
        <div className='col-2'>
            <div className='all-product '>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list list-all-product" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                SẢN PHẨM
            </div>   
            <div className='room'>
                <ListRoom/>
            </div>
        </div>
        <div className='col-6 info-homepage-top row'>
            <div className='col-4 naviga'>
                Best seller
            </div>
            <div className='col-4 naviga'>
                Giảm giá
            </div>
            <div className='col-4 naviga'>
                Blog
            </div>
            <div className='img-homepage'>
                <img src={logo}></img>
            </div>
        </div>
        <div className='col-2'>
        </div>
    </div>
  )
}
