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
    return (
        <div>
           <HeaderGuest/>
           <div className='page-category'>
                <div className='page-category-img'>
                    <img src={category.image}></img>
                    <h3>{category.name}</h3>
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
