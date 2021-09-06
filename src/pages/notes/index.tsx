import { FC, useEffect } from "react";
import { setDefaultValue, getLastItem, hidePrivate, getCookieObject, proxyApply, cache } from '@/notes/proxy'


const TestNotes:FC = () => {
    const zuobiao = { x:10, _d:45 }
    const arr = getLastItem([1,2,3,4,6,-1,7,])
    const defaultZero = setDefaultValue(zuobiao,44)
    const o = hidePrivate(zuobiao)
   
    const cookie = getCookieObject()
 
    const myFn = (a:number,b?: number) => {
        return `sum: ${a + (b ?? 0)}`
    }

    const fn = proxyApply(myFn)
    const re = fn(2)

    const ca = cache(zuobiao,10000)
    
    useEffect(() => {
        setTimeout(() =>{
            console.log('20:',ca.x)
        },2000)
        setTimeout(() =>{
            console.log('65:',ca.x)
        },6500)
        setTimeout(() =>{
            console.log('110:',ca.x)
        },11000)
    },[])
    
    
    return <div>
        { arr[-2] }
    </div>
}

export default TestNotes