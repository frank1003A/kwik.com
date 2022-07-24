import React, { FC, useRef, useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import { DropTargetMonitor, useDrop } from 'react-dnd';
import ITEM_TYPE from "./Data/Kwik_Creator/ITEM_TYPE";
import stx from '../styles/Kwikeditor.module.css'
import { DropComponents } from '../components/CreatorDnd/types'

interface Props {
  item: DropComponents[];
  addCompToDiv: (id: any) => void, 
}

interface rx {
  [key: string]: string;
}

const RxDiv: FC<Props> = ({ item, addCompToDiv }) => {
  const [state, setState] = useState<{
    width: number | string;
    height: number | string;
  }>({ width: "100px", height: "100px" });
  //const rxdiv = useRef<Resizable | null>(null);
  const rxdiv = useRef<HTMLDivElement | null>(null);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
}

const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    let item = event.dataTransfer.getData("item"); 
      let itm = JSON.parse(item)
      addCompToDiv(itm.id)
}

  useEffect(() => {
    console.log(rxdiv.current);
  }, []);

  return (
    <div
       ref={rxdiv}
      className={stx["resizable-container"]}
      onDragOver={(event) => onDragOver(event)}
      onDrop={(event) => onDrop(event)}
    >
      {
        item.map(itm  => {
          return (
            <p>{itm.drop_id}</p>
          )
        })
      }
    </div>
  );
};

export default RxDiv;

/**<Resizable
      ref={rxdiv}
      boundsByDirection={false}
      className={stx["resizable-container"]}
      size={state}
      onResizeStop={(e, direction, ref, d) => {
        setState({
          width: Number(state.width) + d.width,
          height: Number(state.height) + d.height,
        });
      }}
    >
      {children}
    </Resizable> */
