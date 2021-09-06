



import React, { FC, DragEvent, MouseEvent as M, useState, useRef, useEffect, CSSProperties } from 'react'
import produce from 'immer'
import styles from './drag.less'


const Drag:FC = () => {

    const [ state, setState ] = useState({
        isDrag:false,
        x:0,
        y:0
    })  
    const baseState = [
        {
            id: "JavaScript",
            title: "Learn TypeScript",
            done: true
        },
        {
            id: "Immer",
            title: "Try Immer",
            done: false
        }
    ]
        
    const toggleTodo = produce<Array<typeof baseState[0]>,[string]>((draft,id) => {
        const todo = draft.find(f => f.id === id)
        if(todo){
            // todo.done == !todo.done
            Reflect.deleteProperty(todo,'done')
        }
        // const todo = draft.find(t => t.id === id)!
        // todo.done = !todo.done
    })

    const nextState = toggleTodo(baseState, "Immer")

    console.log(nextState,baseState);
    
    const handleDrag = (e:DragEvent<HTMLDivElement>) => {
        // console.log((e.target as HTMLDivElement).getBoundingClientRect());
        // setState(c=>({ ...c, isDrag:false }))
    }

    const handleDrop = (e:DragEvent<HTMLDivElement>) =>{
        const wrap = (e.target as HTMLDivElement).getBoundingClientRect()
        
        let x = e.clientX - wrap.x
        let y = e.clientY - wrap.y
       
       
        setState(c=>({
            ...c,
            x,
            y
        }))
    }
    
    return <div className={styles.drag}>
        <div className={styles.wrapper} onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}}>
            <div 
                className={styles.target} 
                draggable
                style={{ 
                    opacity: state.isDrag ? 0.5 : 1, 
                    transform: `translate(${state.x}px,${state.y}px)`
                }}
                onDragStart={() => {setState(c=>({ ...c, isDrag:true }))}}
                // onDragEnd={handleDrag}
                // onDragLeave={handleDrag}
                ></div>
        </div>
       <DragMouse />
    </div>
}

const DragMouse:FC = () => {

    const isDrag = useRef(false)
    const [ style, setStyle ] = useState<CSSProperties>()
 
    useEffect(() => {
        document.addEventListener('mouseup',  (v)  => {
            isDrag.current = false         
        })
    },[])

    const handleMove = (e:M<HTMLDivElement>) => {
        isDrag.current = true
        e.target.addEventListener('mousemove',  (v)  => {
            const { movementX, movementY } = v as MouseEvent
            if(isDrag.current){
                // console.log(e.target);
                
                const getStyle = window.getComputedStyle(e.target as any)
                const matrix = new WebKitCSSMatrix(getStyle.transform);
                setStyle({
                    transform:`translate(${matrix.e + movementX}px,${matrix.f + movementY}px)`
                })
                console.log(`translate(${matrix.e + movementX}px ${matrix.f + movementY}px)`);
            }           
                  
        })
       
    }

    return  <div className={styles.wrapper} >
        <div 
            className={styles.target} 
            onMouseDown={handleMove}
            style={style}
            // onDragStart={() => {setState(c=>({ ...c, isDrag:true }))}}
            // onDragEnd={handleDrag}
            // onDragLeave={handleDrag}
            ></div>
    </div>
}

export default Drag