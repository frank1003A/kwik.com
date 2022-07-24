import React, { useState, FC, useRef, useEffect, Fragment, ReactChild, ReactNode } from "react";
import {
  LayersOutlined,
  ImageAspectRatio,
  FormatShapes,
  TextFieldsOutlined,
  Settings,
  Folder,
  Lightbulb,
  LeakAddTwoTone
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import { Typography } from "@mui/material";
import styles from '../../styles/Kwikeditor.module.css'
import Creator_Panel from "./Creator_Panel";
import Item from "../KwikCreator/Item"; 
/**import Item from "../CreatorDnd/item";  */
import component_data from "../Data/Kwik_Creator/components"
import { DragDropContext, Draggable, Droppable, DraggableProvided, DraggableRubric, DraggableStateSnapshot, DroppableProvided } from "react-beautiful-dnd";
import item from "../KwikCreator/Item";
import { Components } from "../Data/Kwik_Creator/types";

const Editorbar:FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cA, setCa] = useState<string>("");

  const panel = useRef<HTMLDivElement | null>(null);
  const cmp = useRef<HTMLDivElement | null>(null);

  const onDragEnd = () => {
    console.log('dropped')
  }
  

  const elements: JSX.Element[] = [
    <React.Fragment>
    <div className={styles.top}>
            <label className={styles.tg}>
              Tour <Lightbulb sx={{ fill: "#fff" }} />
            </label>
            <input type="text" placeholder="Search Elements..." />
          </div>
      {component_data.map((element, i) => {
            return (
              <div className={styles.editorComp} key={element.id}>
                <Item item={element} itemToDrag={element.icon} />
              </div>
            );
          })} 
    </React.Fragment>
  ];

  /**
     * <div className={styles["editorCompOuter"]}>
          <div className={styles.top}>
            <label className={styles.tg}>
              Tour <Lightbulb sx={{ fill: "#fff" }} />
            </label>
            <input type="text" placeholder="Search Elements..." />
          </div>
     * {component_data.map((element, i) => {
            return (
              <div className={styles.editorComp} key={element.id}>
                <Item item={element} itemToDrag={element.icon} />
              </div>
            );
          })} 
          <Draggable draggableId="sfs" index={1}>
          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => (
              <div 
              className={styles.editorComp} 
              key={1} 
              {...provided.dragHandleProps}
              {...provided.dragHandleProps}
              >
                {component_data.map((element, i) => {
            return (
              <div className={styles.editorComp} key={element.id}>
                {element.icon}
              </div>
            );
          })}
              </div>
              )}
          </Draggable>
          
          
          */

  const handleActive = (id: string) => {
    let str = "";
    if (isActive == true && cA === id) {
      str = styles.sbocontActive;
    } else {
      str = styles.sbocont;
    }
    return str;
  };

  const handleCreatorPanel = (): JSX.Element => {
    let elm: JSX.Element = <></>;
    if (isActive === true && cA === "elements") {
      elm = <>{elements}</>;
    }
    return elm;
  };

  const handleBar = (el: HTMLDivElement, el2: HTMLDivElement, cls: string) => {
    const children = el.children;
    for (let i = 0; i < children.length; i++) {
      if (!children) return;
      children[i].addEventListener("click", () => {
        //const styls = window.getComputedStyle(el2, null)
        el2.style.display = "flex";
        el2.style.justifyContent = "space-evenly";
        el2.style.flexDirection = "column";
        el2.style.transition = "0.2s easein";
        setIsActive(true);
        setCa(children[i].id);
      });

      el2.addEventListener("mouseenter", () => {
        el2.style.display = "flex";
        el2.style.justifyContent = "space-evenly";
        el2.style.flexDirection = "column";
      });

      el2.addEventListener("mouseleave", () => {
        el2.style.display = "none";
        el2.style.transition = "0.2s easeout";
        setIsActive(false);
        setCa("");
      });
    }
  };

  useEffect(() => {
    const divs = panel.current!;
    const comps = cmp.current!;
    handleBar(divs, comps, styles.sbocont);
  }, [panel]);

  return (
    <Box className={styles.sb} sx={{ display: { xs: "none", md: "flex" } }}>
      <div className={styles.sbo} ref={panel}>
        <div className={handleActive("templates")} id={"templates"}>
          <div className={styles.smallcontainer}>
            <LayersOutlined />
          </div>
          <p>TEMPLATES</p>
        </div>

        <div className={handleActive("photo")} id={"photo"}>
          <div className={styles.smallcontainer}>
            <ImageAspectRatio />
          </div>
          <p>PHOTO</p>
        </div>

        <div className={handleActive("elements")} id={"elements"}>
          <div className={styles.smallcontainer} id={styles["cmp"]}>
            <FormatShapes />
          </div>
          <p>ELEMENTS</p>
        </div>

        <div className={handleActive("text")} id={"text"}>
          <div className={styles.smallcontainer}>
            <TextFieldsOutlined />
          </div>
          <p>TEXT</p>
        </div>

        <div className={handleActive("myfiles")} id={"myfiles"}>
          <div className={styles.smallcontainer}>
            <Folder />
          </div>
          <p>MYFILES</p>
        </div>
      </div>
      {/** */}
      <div className={styles["kwikCreatorpanel"]} ref={cmp}>
        <div className={styles["editorCompOuter"]}>
          {handleCreatorPanel()}
        </div>
      </div>
    </Box>
  );
}

export default Editorbar

/**isActive
 * 

      /** const child = el.children[2].id
        if (child) {
          el.addEventListener("mouseenter",() => {
            el2.style.display = "flex"
            el2.style.justifyContent = "space-evenly"
            el2.style.flexDirection = "column"
            el2.style.transition = "0.1s easein"
          })

          el.addEventListener("mouseleave", () => {
            el2.style.display = "none"
            el2.style.transition = "0.1s easeout"
          })

          el2.addEventListener("mouseenter", () => {
            el2.style.display = "flex"
            el2.style.justifyContent = "space-evenly"
            el2.style.flexDirection = "column"
          })

          el2.addEventListener("mouseleave", () => {
            el2.style.display = "none"
            el2.style.transition = "0.1s easeout"
          })

        } */

    /**const getCompoent = (el : HTMLDivElement, value: string) => {
      if (el.className ===  value) {
        const chlld = el.childNodes
        chlld.forEach(elm => {
          console.log(elm.addEventListener("click", (e: Event) => {
            e.preventDefault();
            alert(`you clicked ${elm.nodeName}`)
          }))
        })
      }
    } 

    const addEvent = (el : HTMLDivElement, cl: string,  event: string) => {
      if (el.className !== cl) return
      //console.log(el[0])
    }
 */