import React, { useReducer } from 'react'
import Context from './Context'
import Reducer, { initState } from './Reducer'

export default function Provider({children}) {
    const [state , dispatch] = useReducer(Reducer,initState)
  return (
    <Context.Provider value={[state , dispatch]}>
        {children}
    </Context.Provider>
  )
}
