import React, { useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import './css/Category.css'
export default function Category({key,category}) {
  const navigate = useNavigate();

  const handleClickCategory=useCallback((e)=>{  
    var nav=`/category/${category.categoryId}`
    navigate(nav)
  },[])
  return (
    <div className='category' onClick={handleClickCategory}>
        {category.name}
    </div>
  )
}

