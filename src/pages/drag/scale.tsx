

// import 

import { FC, useCallback, useEffect, useLayoutEffect, useRef, useState, MouseEvent, DragEvent } from "react";
import classNames from 'classnames'
import styles from './drag.less'

const  Scale:FC = ({ children }) => {
    const [ state, setState ] = useState({
        x:0,
        y:0,
        width:400,
        height:300,
    })

    const pointRef = useRef(0)
    // const ref = useRef<HTMLDivElement>(null)
    // const obs = useRef<MutationObserver>()
    // useEffect(() => {
    //     const o = new MutationObserver((e) => {
    //         setTimeout(() => { // image load
    //             for(let i of e){
    //                 console.log((i.target as HTMLDivElement).getBoundingClientRect());                    
    //             }
    //         },1500)
            
    //     })
    //     if(ref.current && o){            
    //         o.observe(ref.current,{ attributes: true, childList: true, subtree: true })
    //     }
    // },[ref, children])




    const onMouseDown = (e:MouseEvent<HTMLDivElement>, point:number) => {
        // setState(c=>({ ...c, point }))
        pointRef.current = point
    }
    const onMouseMove = useCallback((e:MouseEvent<HTMLDivElement>, point:number) => {
        console.log(pointRef.current);
        
        if(pointRef.current){
            console.log(e);
            setState(c=>({
                ...c,
                width:e.clientX,
                height:e.clientY
            }))
        }
        
    },[pointRef.current])
    const onMouseUp = (e:MouseEvent<HTMLDivElement>, point:number) => {
        // setState(c=>({ ...c, point:0 }))
        console.log('upupuupupupupupu');
        
        pointRef.current = 0
    }

    const handleDrag = (e:DragEvent<HTMLDivElement>) => {
        console.log(e);
        setState(c=>({
            ...c,
            width:e.clientX,
            height:e.clientY
        }))
    }
    const handleDragStart = (e:DragEvent<HTMLDivElement>) => {
        pointRef.current = 1
    }
    const handleDragEnd = (e:DragEvent<HTMLDivElement>) => {
        pointRef.current = 0
        setState(c=>({
            ...c,
            width:e.clientX,
            height:e.clientY
        }))
    }

    return <div className={styles.scale} style={{ width:state.width, height:state.height  }}>
        <div className={styles.points}>
            {/* <div onMouseDown={e => onMouseDown(e, 1)} onMouseMove={e => onMouseMove(e, 1)} onMouseUp={e => onMouseUp(e, 1)} className={classNames(styles.point,styles.topLeft)}></div>
            <div onMouseDown={e => onMouseDown(e, 2)} onMouseMove={e => onMouseMove(e, 2)} onMouseUp={e => onMouseUp(e, 2)} className={classNames(styles.point,styles.topRight)}></div>
            <div onMouseDown={e => onMouseDown(e, 3)} onMouseMove={e => onMouseMove(e, 3)} onMouseUp={e => onMouseUp(e, 3)} className={classNames(styles.point,styles.bottomLeft)}></div>
            <div onMouseDown={e => onMouseDown(e, 4)} onMouseMove={e => onMouseMove(e, 4)} onMouseUp={e => onMouseUp(e, 4)} className={classNames(styles.point,styles.bottomRight)}></div> */}
            <div draggable onDrag={e => handleDrag(e)} onDragStart={e => handleDragStart(e)} onDragEnd={e=>handleDragEnd(e)} className={classNames(styles.point,styles.topLeft)}></div>
            <div draggable onDrag={e => handleDrag(e)} onDragStart={e => handleDragStart(e)} onDragEnd={e=>handleDragEnd(e)} className={classNames(styles.point,styles.topRight)}></div>
            <div draggable onDrag={e => handleDrag(e)} onDragStart={e => handleDragStart(e)} onDragEnd={e=>handleDragEnd(e)} className={classNames(styles.point,styles.bottomLeft)}></div>
            <div draggable onDrag={e => handleDrag(e)} onDragStart={e => handleDragStart(e)} onDragEnd={e=>handleDragEnd(e)} className={classNames(styles.point,styles.bottomRight)}></div>
        </div>
        <div className={styles.wrapper} >
            { children }
        </div>
    </div>
}

const ScalePage:FC = () => {
    const [ state, setState ] = useState(0)
    useEffect(() =>{
        setTimeout(() => {
            setState(2)
        },1500)
    },[])
    return <div style={{ width:960, height:520,  background:'#5271ff' }}>
        <Scale>
            <img src="https://img.weixiaoqu.com/images/uploads/5741/202011/ffda385a5de37b22a02467a9144a9a4d.jpg"/>
           
        </Scale>
    </div>
}

export default ScalePage