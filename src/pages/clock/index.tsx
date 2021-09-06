
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useInterval } from '@/hooks'
import styles from './clock.less'

const range = (num:number) => {
    return [  ...new Array(num).keys() ]
}

const mGetDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const d = new Date(year, month, 0)
    return d.getDate()
}

const Clock:React.FC = () => {

    const [ date, setDate ] = useState({
        second:0,
        minute:0,
        hour:0,
        day:0,
        week:0,
        month:0,
        year:0,      
    })

    const [ x, setX ] = useState(0)

    const thisMonthHas = useRef(mGetDate)

    useInterval(() => {
        const date = new Date()
        setDate(c=>({
            ...c,           
            second:date.getSeconds(),
            minute:date.getMinutes(),
            hour:date.getHours(),
            day:date.getDate(),
            month:date.getMonth(),
            week:date.getDay(),
        }))       
        
    },1000)
    
    useEffect(() => {
        document.body.addEventListener('mousemove',e => {           
            const half =  window.innerWidth / 2
            let x = -(half - e.screenX)
            setX(x/5)
        })
        return () => {
            document.body.removeEventListener('mousemove',() => {})
        }
    },[])
    
    const transform = (current:number, angle:number ):React.CSSProperties => {
       
        angle = (current * angle) 
        return { transform:`rotate(${angle}deg)` }
    }
    
    return <div className={styles.clock}>
        <div className={styles.wrapper} style={{ transform:`translateX(${x}px)` }}>
            <div className={classNames(styles.second,styles.group)} style={transform(date.second,6)}>
                {
                    [  ...new Array(60).keys() ].map(i=><div className={classNames(styles.item,{
                        [styles.on]:i === date.second
                    })} 
                    style={{ transform:`translateY(-50%) rotate(${ (- 6 * i )}deg)` }}
                    key={i}>
                        <div> { String(i).padStart(2,'0') } 秒</div>
                    </div>)
                }
            </div>     
            <div className={classNames(styles.minute,styles.group)} style={ transform(date.minute,6) }>
                {
                    [  ...new Array(60).keys() ].map(i=><div className={classNames(styles.item,{
                        [styles.on]:i === date.minute
                    })} 
                    style={{ transform:`translateY(-50%) rotate(${-6*i}deg)` }}
                    key={i}>
                        <div>{ String(i).padStart(2,'0') } 分</div>
                    </div>)
                }
            </div>       
            <div className={classNames(styles.hour,styles.group)} style={ transform(date.hour,360/24)}>
                {
                    [  ...new Array(24).keys() ].map(i=><div className={classNames(styles.item,{
                        [styles.on]:i === date.hour
                    })}  
                    style={{ transform:`translateY(-50%) rotate(${-(360/24)*i}deg)` }}
                    key={i}>
                        <div>{ String(i).padStart(2,'0') } 时</div>
                    </div>)
                }
            </div>       
            <div className={classNames(styles.week,styles.group)} style={transform(date.week - 1 ,360/7)}>
                {
                    [  ...new Array(7).keys() ].map(i=><div className={classNames(styles.item,{
                        [styles.on]:i === (date.week - 1)
                    })}   
                    style={{ transform:`translateY(-50%) rotate(${-(360/7)*i}deg)` }}
                    key={i}>
                       <div> 星期{ String(i + 1) } </div>
                    </div>)
                }
            </div>    
            <div className={classNames(styles.day,styles.group)} style={transform(date.day - 1 ,360/thisMonthHas.current())}>
                {
                    [  ...new Array(thisMonthHas.current()).keys() ].map(i=><div className={classNames(styles.item,{
                        [styles.on]:i === (date.day - 1)
                    })}   
                    style={{ transform:`translateY(-50%) rotate(${-(360/thisMonthHas.current())*i}deg)` }}
                    key={i}>
                       <div> { String(i + 1).padStart(2,'0') } 日</div>
                    </div>)
                }
            </div>  
            <div className={classNames(styles.month,styles.group)} style={transform(date.month ,360/12)}>
                {
                    [  ...new Array(12).keys() ].map(i=><div className={classNames(styles.item,{
                        [styles.on]:i === date.month
                    })}
                    style={{ transform:`translateY(-50%) rotate(${-(360/12)*i}deg)` }}
                    key={i}>
                        <div>{ String(i + 1).padStart(2,'0') } 月</div>
                    </div>)
                }
            </div>      
               
             
        </div>
    </div>
}

export default Clock