import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'


export default function ListBestSellerProduct() {
    const [listProductBestSeller,setListProductBestSeller]=useState([])
    useEffect(()=>{
        axios.get("/guest/product/top8Product")
        .then(res=>setListProductBestSeller(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <div >
        {listProductBestSeller.map((product)=>
            <Product key={product.productId} product={product}/>
        )}
    </div>
  )
}
