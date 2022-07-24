import React, { Fragment, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import styles from '../../styles/Home.module.css';
import ITEM_TYPE from '../Data/Kwik_Creator/ITEM_TYPE';

interface Props {
  item: any;
  itemToDrag: JSX.Element[] | JSX.Element;
}

/**const itemz = reorder(
      components,
      result.source.index,
      result.destination.index
    );

    setter(itemz) */

const item = ({ item, itemToDrag}: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      isDropped: monitor.didDrop(),
      isDraggable: monitor.canDrag(),
    }),
    canDrag(monitor) {
      let value = true
      if (item.id) return value
      if (item.drop_id) return value = false
      return value
    },
  });

  return (
    <Fragment>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0 : 1,
          background: "transparent",
          display: "flex",
          alignItems: "center",
        }}
        className={styles["dragComp"]}
      >
        {itemToDrag}
      </div>
    </Fragment>
  );
};

export default item;

//<Typography fontSize={10} >{itemName}</Typography>
//isDropped ? console.log(item) : console.log('no item')
/*
const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);


hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
*/
