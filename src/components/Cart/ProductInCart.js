import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ProductInCart({key,productId}) {
    //variable product 
    const [product,setProduct]=useState([])
    //variable count that user want to order
    useEffect(()=>{
      axios.get(`/guest/product/${productId}`)
      .then(res=>setProduct(res.data))
      .catch(err => console.log(err))
    },[])
  return (
    <div>
      {console.log(product)}
        {product.name}:{localStorage.getItem(productId)}
    </div>
  )
}
