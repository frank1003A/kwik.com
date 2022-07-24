import React, {FC, useEffect, useRef, useState } from 'react';
import item from '../KwikCreator/Item';
import { Components, DropComponents } from './types';


interface Props{
    item: (Components | DropComponents),
    itemToDrag: JSX.Element | JSX.Element[],
}

const Item:FC<Props> = ({item, itemToDrag}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const itmDrag = JSON.stringify(item)

    const onDrag = (event:React.DragEvent<HTMLDivElement>) => {
        setIsDragging(!isDragging)
    }

    const onDragStart = (event:React.DragEvent<HTMLDivElement>) => {
    	//console.log('dragstart on div: ', itmDrag);
    	event.dataTransfer.setData("item", itmDrag);
	}

    const onDragEnd = (event:React.DragEvent<HTMLDivElement>) => {
        const div = event.currentTarget
        //console.log(div)
    }

	    return (
        <div
          draggable
          onDrag={(event) => onDrag(event)}
          onDragStart={(event) => onDragStart(event)}
          onDragEnd={(event) => onDragEnd(event)}
          style={{ backgroundColor: "transparent" }}
        >
          {itemToDrag}
        </div>
      );
}

export default Item