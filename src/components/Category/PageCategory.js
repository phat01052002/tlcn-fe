import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import HeaderGuest from '../Header/HeaderGuest'
import ListProductByCategory from './ListProductByCategory'
export default function PageCategory() {
    const {categoryId}=useParams()
    const [category,setCategory]=useState([])
    const [listProduct,setListProduct]=useState([])
    useEffect(()=>{
         axios.get(`/getCategory/${categoryId}`)
        .then(res => setCategory(res.data))
        .catch(err => console.log(err))
    },[])

    //get product by Category

    useEffect(()=>{
        axios.get(`/productsByCategory/${categoryId}`)
        .then(res => setListProduct(res.data))
        .catch(err => console.log(err))
    },[])
    ////////////////////////
    var chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "106002218749895");
    chatbox.setAttribute("attribution", "biz_inbox");
    window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    return (
        <div>
    <div id="fb-root"></div>
    <div id="fb-customer-chat" class="fb-customerchat">
    </div>
           <HeaderGuest/>
           <div className='page-category'>
                <div className='page-category-img'>
                    <h3>{category.name}</h3>
                    <span>
                        <a href='/guest'>Trang chủ</a>
                    </span>
                </div>
           </div>
           <div className='product-by-category'>
                <ListProductByCategory listProduct={listProduct}/>
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
        </div>
    )
}
