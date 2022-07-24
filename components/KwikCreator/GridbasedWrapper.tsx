import React, {FC, useRef, useState, useEffect} from 'react'
import styles from '../../styles/Kwikeditor.module.css'
import DropWrapper from './DropWrapper'

interface Props {
    children: JSX.Element | JSX.Element[] 
}

interface sx {
    readonly [key:string]: string
}

const GridbasedWrapper: FC<Props> = React.forwardRef(({children}, ref: React.LegacyRef<HTMLDivElement>) => {
    const container = useRef<HTMLDivElement | null>(null)

    const rxBx: sx = {
      maxWidth: "800px",
      width: "750px",
      minHeight: "114px",
      display: "grid",
      gridTemplateColumns: "repeat(2 ,1fr)",
      padding: "30px",
      border: "1px solid #eee",
      fontSize: "16px",
      background: "#fff",
      lineHeight: "24px",
      fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
      color: "#555",
      alignContent: "stretch",
      alignItems: "center",
    };

    const containerizer = (el: HTMLDivElement) => {
        console.log(el.className)
    }

    useEffect(() => {
        const cont = container.current!
        containerizer(cont)
    },[])
  return (
      <div className={styles["rxBx"]} ref={ref}>
        {children}
      </div>
  );
})

export default GridbasedWrapper

/** 
 * <DropWrapper
        addCompToPaper={addCompToPaper}
        className={styles["rxBx"]}
      >
        {children}
      </DropWrapper>
    max-width: 800px;
    width: 750px;
    display: grid;
    grid-template-columns: repeat(2 ,1fr);
    padding: 30px;
    border: 1px solid #eee;
    font-size: 16px;
    background: #fff;
    line-height: 24px;
    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    color: #555;
    align-content: stretch;
    align-items: center; */