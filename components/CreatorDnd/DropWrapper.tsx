import React, {FC, useRef, useState, useEffect, ReactElement} from 'react'
import styles from '../../styles/Kwikeditor.module.css'

interface Props {
    children: ReactElement<any , any>,
    className: string,
    addCompToPaper: (id: any) => void, 
    greedy?: boolean
}

const DropWrapper: FC<Props> = ({children, className, addCompToPaper, greedy}) => {
    const [hasDropped, setHasDropped] = useState<boolean>(false)
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState<boolean>(false)
    const [isOver, setIsOver] = useState<boolean>(false)
    const [isOverCurrent, setIsOverCurrent] = useState<boolean>(false)

    const divdrag = useRef<HTMLDivElement | null>(null)

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
	    event.preventDefault();
        setShallow(event)
        setIsOver(true)
	}

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        let item = event.dataTransfer.getData("item"); 
        let itm = JSON.parse(item)
        setHasDropped(true)
        setHasDroppedOnChild(true)
        if (hasDropped && hasDroppedOnChild && !greedy) return
        addCompToPaper(itm.id)
	}

    const setShallow = (e: React.DragEvent<HTMLDivElement>) => {
        const cT = e.currentTarget
        if (cT.ariaLabel === "DW" && cT.className === styles["resizable-container"]) {
            setIsOverCurrent(true)
        }
    }

    /**sets the attribute of the first child of parent element*/
    const changeDivAttribute = (el: HTMLDivElement) => {
        if (el) {
            let chld = el.children
            for (let i = 0; i < el.children.length; i++){
                 const div = chld[i].firstChild as HTMLDivElement
                 //div.draggable = false
            }
        }
    }

    useEffect(() => {
        const div = divdrag.current!
        changeDivAttribute(div)
    },[onDrop])

  return (
    <div
    ref = {divdrag}
      onDragOver={(event) => onDragOver(event)}
      onDrop={(event) => onDrop(event)}
      className={className}
      aria-label='DW'
      style={{background: isOverCurrent ? 'orange': 'white'}}
    >
       {children}
    </div>
  );
}

export default DropWrapper

/**const len = el.children.length
        const child = el.children
        for (let i = 0; i < len; i++){
            if (child[i].ariaLabel === "DW"){
                const DW = child[i] as HTMLDivElement
                const PD = child[i].parentElement as HTMLDivElement
                DW.ondragover = () => {
                    if (!greedy && isOver) {
                        DW.style.background = "orange"; 
                        PD.style.background = "white"
                    }
                }
            }
        } */

/** const fc = div.firstChild as HTMLDivElement
                 if (fc.className === styles['resizable-container']) {
                    const pc = fc.parentElement
                    if (pc !== null) {
                        pc.ondragover = (e: DragEvent) => {
                            e.preventDefault()
                            console.log('entere')
                        }

                        pc.ondrop = (e: DragEvent) => {
                            if (e.dataTransfer !== null){
                            let item = e.dataTransfer.getData("item"); 
                            let itm = JSON.parse(item)
                            console.log(itm)
                            }
                        }
                    }
                 } */ 