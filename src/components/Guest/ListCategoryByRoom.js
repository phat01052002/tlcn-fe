import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Category from './Category'

let room1=[]
let room2=[]
let room3=[]
let room4=[]
let room5=[]
let room6=[]
let room7=[]

export default function ListCategoryByRoom({roomId}) {
    useEffect(()=>{
        axios.get(`/room/categories/1`)
        .then(res=>room1=res.data)
        .catch(error=>console.log(error))
        axios.get(`/room/categories/2`)
        .then(res=>room2=res.data)
        .catch(error=>console.log(error))
        axios.get(`/room/categories/3`)
        .then(res=>room3=res.data)
        .catch(error=>console.log(error))
        axios.get(`/room/categories/4`)
        .then(res=>room4=res.data)
        .catch(error=>console.log(error))
        axios.get(`/room/categories/5`)
        .then(res=>room5=res.data)
        .catch(error=>console.log(error))
        axios.get(`/room/categories/6`)
        .then(res=>room6=res.data)
        .catch(error=>console.log(error))
        axios.get(`/room/categories/7`)
        .then(res=>room7=res.data)
        .catch(error=>console.log(error))
    },[])

    if(roomId==1){
        return (
            <div>
                {room1.map((cat)=>
                    <Category key={cat.categoryId} category={cat}/>
                )}
            </div>
        )
    }
    if(roomId==2){
        return (
            <div>
                {room2.map((cat)=>
                    <Category key={cat.categoryId} category={cat}/>
                )}
            </div>
        )
    }
    if(roomId==3){
        return (
            <div>
                {room3.map((cat)=>
                    <Category key={cat.categoryId} category={cat}/>
                )}
            </div>
        )
    }
    if(roomId==4){
        return (
            <div>
                {room4.map((cat)=>
                    <Category key={cat.categoryId} category={cat}/>
                )}
            </div>
        )
    }
    if(roomId==5){
        return (
            <div>
                {room5.map((cat)=>
                    <Category key={cat.categoryId} category={cat}/>
                )}
            </div>
        )
    }
    if(roomId==6){
        return (
            <div>
                {room6.map((cat)=>
                    <Category key={cat.categoryId} category={cat}/>
                )}
            </div>
        )
    }
    if(roomId==7){
        return (
            <div>
                {room7.map((cat)=>
                    <Category key={cat.categoryId} category={cat}/>
                )}
            </div>
        )
    }
}
