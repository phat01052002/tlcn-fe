import React from 'react'
import './css/Search.css'
export default function ListSearch({nameContaining}) {
  return (
    <div className='list-search'>
        {nameContaining}
    </div>
  )
}
