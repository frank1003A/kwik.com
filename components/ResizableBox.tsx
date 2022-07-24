import React, {FC, useState, useEffect, ReactElement, cloneElement, JSXElementConstructor, useRef, MutableRefObject, LegacyRef} from 'react'
import {Resizable} from 're-resizable';
import Draggable from 'react-draggable';
import styles from "../styles/Kwikeditor.module.css"

interface Props {
  children: ReactElement<any, string | JSXElementConstructor<any>>,
  extCompSize: {width: (number | string), height: (number | string)}
}

const ResizeBox= ({children, extCompSize}: Props) => {
  const [state, setState] = useState<{width: (number | string), height: (number | string)}>(
    {width: "max-content", height: "max-content"}
    )
  
  const resRef = useRef<Resizable | null>(null)!
  const handleResizeandDrag = () => {
    const sizeProp = extCompSize
    const size = state 
    console.log(sizeProp, size)
  }

  console.log(state, extCompSize)

  useEffect(()=> {
    console.log(resRef.current)
  },[])

    return (
      <Draggable>
        <Resizable
        ref={resRef}
          size={state}
          onResizeStop={(e, direction, ref, d) => {
            setState({
              width: Number(state.width) + d.width,
              height: Number(state.height) + d.height,
            });
          }}
        >
          {children}
        </Resizable>
      </Draggable>
    );
}

export default ResizeBox 






/**
 * 
 * 
  const wrapper:React.CSSProperties ={
    position: "absolute",
    border: "1px solid #eb5648",
  }

  const handle: React.CSSProperties = {
    position: "absolute",
    width: "14px",
    height: "14px",
    cursor: "pointer",
    zIndex: "1",
  };
 * 
 * const ResizeBox: FC = () => {
    return (
        <ResizableBox width={200} height={200} draggableOpts={{...}}
            minConstraints={[100, 100]} maxConstraints={[300, 300]}>
          <span>Contents</span>
        </ResizableBox>
      );
}

export default ResizeBoximport { ResizableBox } from 'react-resizable';

 * type ResizeCallbackData = {
    node: HTMLElement,
    size: {width: number, height: number},
    handle: ResizeHandleAxis
  };
  type ResizeHandleAxis = ('s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne')
  
  type ResizableProps =
  {
    children: ReactElement<any>,
    width: number,
    height: number,
    // Either a ReactElement to be used as handle, or a function returning an element that is fed the handle's location as its first argument.
    handle: ReactElement<any> | ((resizeHandle: ResizeHandleAxis, ref: Ref<HTMLElement>) => ReactElement<any>),
    // If you change this, be sure to update your css
    handleSize: [number, number] = [10, 10],
    lockAspectRatio: boolean = false,
    axis: 'both' | 'x' | 'y' | 'none' = 'both',
    minConstraints: [number, number] = [10, 10],
    maxConstraints: [number, number] = [Infinity, Infinity],
    onResizeStop?: ?(e: SyntheticEvent, data: ResizeCallbackData) => any,
    onResizeStart?: ?(e: SyntheticEvent, data: ResizeCallbackData) => any,
    onResize?: ?(e: SyntheticEvent, data: ResizeCallbackData) => any,
    draggableOpts?: ?Object,
    resizeHandles?: ?Array<ResizeHandleAxis> = ['se']
    style?: Object // styles the returned <div />
  };
 * 
 * 
 * const [state, setState] = useState<{width: number, height: number}>()

    // On top layout
  onResize = (event, {element, size, handle}) => {
    setState({width: size.width, height: size.height});
  };
 */