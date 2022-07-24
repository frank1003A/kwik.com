import React, {FC, ReactNode} from 'react'
import { 
    Droppable,
    DragDropContext,  
    DroppableProvided,  
    DroppableStateSnapshot, 
    DropResult, 
    ResponderProvided,
    DraggableChildrenFn
} from 'react-beautiful-dnd'
import { DropComponents } from '../Data/Kwik_Creator/types'

interface Props {
 items: DropComponents[],
 children: ReactNode,
 /**droppable requires a setState to handle multiple dropTargets*/
 setter: React.Dispatch<React.SetStateAction<DropComponents[]>>,
 className: string
}

const DroppableComp: FC<Props> = ({items,children, setter, className}) => {

    const reorder = (list: DropComponents[], startIndex: number , endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result
      };  

    const onDragEnd =(result: DropResult, provided: ResponderProvided) => {
        // dropped outside the list
     if (!result.destination) {
        return;
      }

      const itemz = reorder(
        items,
        result.source.index,
        result.destination.index
      );

      setter(itemz)
    }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
        {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={className}>
            {children}
            </div>
        )}
        </Droppable>
    </DragDropContext>
  )
}

export default DroppableComp