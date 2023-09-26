import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import './css/CategoryTop.css'
export default function CategoryTop({key,category}) {
    const navigate = useNavigate();
    //navigate to category page with Id
    const handleClickCategory=useCallback((e)=>{  
      var nav=`/category/${category.categoryId}`
      navigate(nav)
    },[])
    return (
      <div className='category-top' onClick={handleClickCategory}>
          {category.name}
      </div>
    )
}
