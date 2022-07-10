import React, { Fragment, useState, useRef, } from "react";
import { useDrag, useDrop, DropTargetMonitor, } from "react-dnd";
import Modal from '../Modal'
import ITEM_TYPE from "../Data/Kwik_Creator/ITEM_TYPE";
import Item from '../Data/Kwik_Creator/components'
import { Components, DropComponents } from "../Data/Kwik_Creator/types";
import components from "../Data/Kwik_Creator/components";

interface Props {
    addCompToPaper: (id: any) => void, 
    children: any, 
    className: string,
    id: string,
    style: React.CSSProperties
}

const DropWrapper = ({addCompToPaper, children, className, id, style}:Props) => {
    const [{isOver}, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item: any) => {
            addCompToPaper(item.id)
        },
        collect:(monitor: DropTargetMonitor) => ({
          handlerId : monitor.getHandlerId(),
          isOver: monitor.isOver(),
        }),
        canDrop: (item: any) =>  {
           let status = true
           if (item.drop_id) return status = false 
           return status
        },
        hover(item, dropid) {
          /**if (dropId !== item.drop_id) {
              moveComp(dropId, item.drop_id)
            } */
        },
    })

  return (
    <div ref={drop} className={className}
    style={{backgroundColor: isOver ? 'orange': 'white'}}
    >
        {React.cloneElement(children, {isOver})}
    </div>
  )
}

export default DropWrapper

/**
 * drop: (item, monitor) => {
            onDrop(item, monitor)
        },

         canDrop: (item) => {
            const itemIndex = Item.findIndex(ci => ci.id === item.id);
            const componentIndex = Item.findIndex(ci =>  ci.component === Item);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(componentIndex)
        },
         */