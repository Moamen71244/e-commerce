"use client"
import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { CartResponse } from "../interfaces"
export interface cartContextInterface {
    numOfCartData:number,
    UpdateCartData:(cart:number)=>void
}

export const cartContext = createContext<cartContextInterface>({numOfCartData:0,UpdateCartData:(cart)=> cart})
export default function CartDataProvider({children,res}:{children:ReactNode,res:CartResponse | null}) {
    
    const [numOfCartData , setnumOfCartData] = useState(()=>{
        return res? res.numOfCartItems  : 0
    })
    const UpdateCartData = useCallback((cart:number)=>{
        setnumOfCartData(cart)
    }, [])

    const contextValue = useMemo(
      () => ({ numOfCartData, UpdateCartData }),
      [numOfCartData, UpdateCartData]
    )

  return (
    <cartContext.Provider value={contextValue} >
        {children}
    </cartContext.Provider>
  )
}
