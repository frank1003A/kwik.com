import React, { Fragment, useState, useRef, useEffect, } from "react";
import { useDrag, useDrop, DropTargetMonitor, } from "react-dnd";
import Modal from '../Modal'
import ITEM_TYPE from "../Data/Kwik_Creator/ITEM_TYPE";
import Item from '../Data/Kwik_Creator/components'
import { Components, DropComponents } from "../Data/Kwik_Creator/types";
import components from "../Data/Kwik_Creator/components";

interface Props {
    addCompToPaper: (id: any, setter: React.Dispatch<React.SetStateAction<DropComponents[]>>) => void, 
    children?: any | any[], 
    className?: string,
    greedy?: boolean,
    /**Drop-Wrapper requires a State and Setter to handle multiple dropTargets*/
    setter: React.Dispatch<React.SetStateAction<DropComponents[]>>
}

const DropWrapper = ({addCompToPaper, children, className, greedy, setter}:Props) => {
  const [hasDropped, setHasDropped] = useState<boolean>(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState<boolean>(false)

    const [{isOver, isOverCurrent}, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item: any, monitor: DropTargetMonitor) => {
          const didDrop = monitor.didDrop()
          if (didDrop && !greedy) {
            return
          }
          addCompToPaper(item.id, setter!)
          setHasDropped(true)
          setHasDroppedOnChild(didDrop)
        },
        collect:(monitor: DropTargetMonitor) => ({
          handlerId : monitor.getHandlerId(),
          isOver: monitor.isOver(),
          isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    },
    [greedy, setHasDropped, setHasDroppedOnChild, addCompToPaper],
    )

  return (
    <div ref={drop} className={className}
    style={{backgroundColor: isOverCurrent || (isOver && greedy) ? 'orange': 'white'}}
    >
     {React.cloneElement(children, {isOver})} 
    </div>
  )
}

export default DropWrapper

/**{React.cloneElement(children, {isOver})}
 * drop: (item, monitor) => {
            onDrop(item, monitor)
        },

         canDrop: (item) => {
            const itemIndex = Item.findIndex(ci => ci.id === item.id);
            const componentIndex = Item.findIndex(ci =>  ci.component === Item);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(componentIndex)
        },
         */