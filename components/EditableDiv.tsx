import React, {FC, useRef , useEffect} from 'react'
import styles from '../styles/Kwikeditor.module.css'

interface sx {
    [key: string] : React.CSSProperties
}

const EditableDiv: FC = () => {
    const refBox = useRef<HTMLDivElement | null>(null)
    const refTop = useRef<HTMLDivElement | null>(null)
    const refRight = useRef<HTMLDivElement | null>(null)
    const refBottom = useRef<HTMLDivElement | null>(null)
    const refLeft = useRef<HTMLDivElement | null>(null)


 useEffect(() => {
    const resizableElement = refBox.current!
    const styles = window.getComputedStyle(resizableElement, null)
    let width = parseInt(styles.width, 10) // 100px -> 100
    let height = parseInt(styles.height, 10) // 100px -> 100

    let xcord = 0
    let ycord = 0

    if (resizableElement !== null){
        resizableElement.style.top= "150px"
        resizableElement.style.left= "150px"
    }

    //Top
    const onMouseMoveTopResize = (event: MouseEvent) => {
        const dy = event.clientY - ycord
        height = height - dy
        ycord = event.clientX
        resizableElement.style.height = `${height}px`
    }

    const onMouseUpTopResize = (event: MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveTopResize)
    }

    const onMouseDownTopResize = (event: MouseEvent) => {
        ycord = event.clientY
        const styles = window.getComputedStyle(resizableElement)
        resizableElement.style.bottom = styles.top
        resizableElement.style.top = ""
        document.addEventListener("mousemove", onMouseMoveTopResize)
        document.addEventListener("mouseup", onMouseUpTopResize)
    }

    //Right
    const onMouseMoveRightResize = (event: MouseEvent) => {
        const dx = event.clientX - xcord
        xcord = event.clientX
        width = width - dx
        resizableElement.style.width = `${width}px`
    }

    const onMouseUpRightResize = (event: MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveRightResize)
    }

    const onMouseDownRightResize = (event: MouseEvent) => {
        xcord = event.clientX
        const styles = window.getComputedStyle(resizableElement)
        resizableElement.style.bottom = styles.right
        resizableElement.style.top = ""
        document.addEventListener("mousemove", onMouseMoveRightResize)
        document.addEventListener("mouseup", onMouseUpRightResize)
    }

    //Bottom
    const onMouseMoveBottomResize = (event: MouseEvent) => {
        const dy = event.clientY - ycord
        height = height - dy
        ycord = event.clientX
        resizableElement.style.height = `${height}px`
    }

    const onMouseUpBottomResize = (event: MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveBottomResize)
    }

    const onMouseDownBottomResize = (event: MouseEvent) => {
        ycord = event.clientY
        const styles = window.getComputedStyle(resizableElement)
        resizableElement.style.bottom = styles.bottom
        resizableElement.style.top = ""
        document.addEventListener("mousemove", onMouseMoveBottomResize)
        document.addEventListener("mouseup", onMouseUpBottomResize)
    }

    //left
    const onMouseMoveleftResize = (event: MouseEvent) => {
        const dx = event.clientX - xcord
        xcord = event.clientX
        width = width - dx
        resizableElement.style.width = `${width}px`
    }

    const onMouseUpleftResize = (event: MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveleftResize)
    }

    const onMouseDownleftResize = (event: MouseEvent) => {
        xcord = event.clientX
        const styles = window.getComputedStyle(resizableElement)
        resizableElement.style.bottom = styles.left
        resizableElement.style.top = ""
        document.addEventListener("mousemove", onMouseMoveleftResize)
        document.addEventListener("mouseup", onMouseUpleftResize)
    }

    //mouse down event listener 
    const resizerRigth = refRight.current
    resizerRigth?.addEventListener("mousedown", onMouseDownRightResize)

    const resizerLeft = refLeft.current
    resizerLeft?.addEventListener("mousedown", onMouseDownleftResize)

    const resizerTop = refTop.current
    resizerTop?.addEventListener("mousedown", onMouseDownTopResize)

    const resizerBottom = refBottom.current
    resizerBottom?.addEventListener("mousedown", onMouseDownBottomResize)

    return () => {
        resizerRigth?.removeEventListener("mousedown", onMouseDownRightResize)
        resizerLeft?.removeEventListener("mousedown", onMouseDownleftResize)
        resizerTop?.removeEventListener("mousedown", onMouseDownTopResize)
        resizerBottom?.removeEventListener("mousedown", onMouseDownBottomResize)
    }
         
 }, [])

  return (
    <div id="box" className={styles["resizable-box"]} ref={refBox}>
      <div id="handler"  className={styles["rl"]} ref={refLeft}></div>
      <div id="handler"  className={styles["rt"]} ref={refTop}></div>
      <div id="handler"  className={styles["rr"]} ref={refRight}></div>
      <div id="handler"  className={styles["rb"]} ref={refBottom}></div>
    </div>
  );
}

export default EditableDiv

/**let x: number , y:number , h:number , w:number ;

   const box = ref.current
   
   const ts = (event: TouchEventHandler<HTMLDivElement>): void => {

    let x = event.;
    let y = e.touches[0].clientY;
    
    let h = box.clientHeight;
    let w = box.clientWidth;
   }
   
   const tm = (event: TouchEventHandler<HTMLDivElement>): void =>{
    let mx = e.touches[0].clientX;
    let my = e.touches[0].clientY;
    
    let cx = mx - x ;
    let cy = my - y ;
    
    box.style.width= cx+w;
    box.style.height= cy+h;
   }
   
   <div id="box" style={styles.box} ref={ref}>
      <div id="handler"  style={styles.handler}></div>
    </div>
   
   */