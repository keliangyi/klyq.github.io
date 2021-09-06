



import React, { FC, DragEvent, useState, useEffect, useRef } from 'react'
import styles from './drag.less'

interface SortableProps<T = any> {
    list:T[]
    renderItem:(item:T,idx:number) => React.ReactNode
}


const debounce = (fn:Function, ms = 0) => {
    let timeoutId:ReturnType<typeof setTimeout>;
    return function(this:unknown,...args:any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    }
}

function swapArr(arr1:any[], index1:number, index2:number) {
    const arr = JSON.parse(JSON.stringify(arr1))
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

const Sortable:FC<SortableProps> = ({ list, renderItem }) =>{
    let dragRef = useRef<number>(0)
    const [ data, setData ] = useState(list)
    const [ dragIndex, setDragIndex ] = useState<number>()

    useEffect(() => {
        setData(list)        
    },[list])

    useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('https://192.168.1.250:5959/user/113113?type=1',{
				mode:"cors",
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				}
			})
			console.log(res);
			
		}

		fetchData()
	},[])


    const handleDrop = (e:DragEvent<HTMLDivElement>,) => {
        e.preventDefault() 

    }

    const handleDragOver= debounce((e:DragEvent<HTMLDivElement>,overIndex:number) => {
        e.preventDefault()           
        // setData(swapArr(data,dragRef.current, overIndex ))  
        setData(c=>{
            const nd = c.filter((_,idx) => idx !== dragIndex)
            nd.splice(overIndex,0,c.find((_,ix) => ix === dragIndex))
            return nd
        })
    },100)

    return <div className={styles.Sortable}>
        { 
            data.map((i,idx) => <div 
                key={idx} 
                className={styles.item} 
                draggable 
                // style={{ opacity:dragIndex === idx ? 0 : 1 }}
                onDragStart={() => {
                    setDragIndex(idx)
                }}
                onDrop={e => handleDrop(e)} 
                onDragOver={e => handleDragOver(e, idx)}>
                { renderItem(i,idx) }
            </div>) 
        }
    </div>
}

const Sort:FC = () => {

    const data =  ['angel===1', 'clown===2', 'mandarin===3', 'sturgeon===4','angel===5', 'clown===6', 'mandarin===7', 'sturgeon===8'];

   
  
    
    return <div >
        <Sortable list={data} renderItem={(i,idx) => {
            return <div key={i} >{i} </div>
        }}  />
    </div>
}

export default Sort