import { FormLabel, TextareaAutosize, Typography } from "@mui/material";
import React, {
  Fragment,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { ColorResult } from "react-color";

import component_data from "../../components/Data/Kwik_Creator/components";
import {
  DropComponents,
  Inputprops,
  styleInputProps,
} from "../../components/Data/Kwik_Creator/types";
import EditableColorInput from "../../components/EditableColor";
import EditableImageFile from "../../components/EditableImageFile";
import Editorbar from "../../components/Editorbar";
import EditorLayout from "../../components/EditorLayout";
import DropWrapper from "../../components/KwikCreator/DropWrapper";
import Item from "../../components/KwikCreator/Item";
/**import Item from "../../components/CreatorDnd/item";
import DropWrapper from "../../components/CreatorDnd/DropWrapper"; */
import KwikCreatorPanel from "../../components/KwikCreatorPanel";
import PropertyBar from "../../components/PropertyBar";
import home_styles from "../../styles/Home.module.css";
import styles from "../../styles/Invoice.module.css";
import stx from "../../styles/Kwikeditor.module.css";

import type { NextPage } from "next";
import {
  Abc,
  Height,
  Lightbulb,
  LineWeight,
  Opacity,
  TextFields,
} from "@mui/icons-material";
import Image from "next/image";
import EditableSlider from "../../components/EditableSlider";
import ResizableBox from "../../components/ResizableBox";
import Creatorbar from "../../components/KwikCreator/Creatorbar";
import CreatorPropsbar from "../../components/KwikCreator/CreatorPropsbar";
import CreatorLayout from "../../components/KwikCreator/CreatorLayout";
import EditableDiv from "../../components/EditableDiv";
import CreatorBox from "../../components/KwikCreator/CreatorBox";
//import Draggable from "react-draggable";
import GridbasedWrapper from "../../components/KwikCreator/GridbasedWrapper";
import RxDiv from "../../components/RxDiv";
import { reorder } from "../../components/KwikCreator/Helper";
import {nanoid} from 'nanoid';
import Droppable from "../../components/KwikCreator/Droppable";

const kwik_creator: NextPage = () => {
  const [components, setComponents] = useState<DropComponents[]>([]);
  const [newValue, setNewValue] = useState<DropComponents[]>([])
  const [color, setcolor] = useState<string>("#2124B1");
  const [displayColorPicker, setdisplayColorPicker] = useState<boolean>(false);
  const [editComp, setEditComp] = useState<boolean>(false);
  const [currentEdit, setCurrentEdit] = useState<number>();
  const [slideValue, setSlideValue] = useState<
    number | string | Array<number | string>
  >(0);
  const [rT, setRt] = useState<{
    width: number | string;
    height: number | string;
  }>({ width: 0, height: 0 });

  const inputprops: Inputprops = {
    placeholder: "Textfield",
    style: {
      color: "#2124B1",
    },
  };

  const handleSliderChange = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof styleInputProps,
    dropid: number
  ) => {
    const { value } = e.currentTarget;
    /**set state for component */
    setSlideValue(value === "" ? "" : Number(value));
    /**main props change**/
    const itemStyleEdit = components.filter((cmp) => {
      if (cmp.drop_id === dropid && name !== undefined) {
        const props: DropComponents = { ...cmp };
        const stylez: styleInputProps = { ...cmp.component_props.style };
        stylez[name] = value;
        if (name === "fontSize") stylez[name] = `${value}px`;
        props.component_props.style = stylez;
        return props;
      }
      return cmp;
    });
    setComponents(itemStyleEdit);
  };

  const handleClick = (): void => {
    setdisplayColorPicker(!displayColorPicker);
  };

  const handleClose = (): void => {
    setdisplayColorPicker(false);
  };

  const handleColorChange = (clr: ColorResult, dropid: number) => {
    setcolor(clr.hex);
    const compEdit = components.filter((cmp) => {
      if (cmp.drop_id === dropid) {
        const props: DropComponents = { ...cmp };
        const stylez: styleInputProps = { ...cmp.component_props.style };

        if (color !== undefined) {
          stylez.color = clr.hex;
        }
        props.component_props.style = stylez;
        return props;
      }
      return cmp;
    });
    setComponents(compEdit);
    //setCompProperty(con)
  };

  const addCompToPaper = (id: number, setter: React.Dispatch<React.SetStateAction<DropComponents[]>>) => {
    let genDropId = nanoid(5)
    const componentList = component_data.filter((comp) => id === comp.id);
    let addedComponents: DropComponents = {
      root_id: componentList[0].id,
      drop_id: genDropId,
      component: `${componentList[0].name}`,
      component_type: `${componentList[0].type}`,
      component_props: { ...inputprops },
    };
    setter((comp) => [...comp, addedComponents]);
  }

  const logoContainer: JSX.Element[] = [
    <div className={styles.title} id="dflogo">
      <EditableImageFile className="logo" placeholder="Company Logo" />
    </div>,
  ];

  const handleEdit = (dropid: number) => {
    setEditComp(true);
    setCurrentEdit(dropid);
  };

  const handleRemove = (dropid: number) => {
    const comp = components.filter((cmp) => cmp.drop_id !== dropid);
    setComponents(comp);
  };

  const handleInputPropertyChange = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Inputprops,
    dropid: number
  ) => {
    const { value } = e.currentTarget;
    const comp = components.filter((cmp) => {
      if (cmp.drop_id === dropid && name !== undefined) {
        const props: DropComponents = { ...cmp };
        const inputprops: Inputprops = { ...cmp.component_props };
        inputprops[name] = value;
        props.component_props = inputprops;
        console.log(props.component_props.placeholder);
        //return props
      }
    });
    /** console.log(comp)
    setComponents(comp) */
  };

  const handleInputStyle = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof styleInputProps,
    dropid: number
  ) => {
    const { value } = e.currentTarget;
    const itemStyleEdit = components.filter((cmp) => {
      if (cmp.drop_id === dropid && name !== undefined) {
        const props: DropComponents = { ...cmp };
        const stylez: styleInputProps = { ...cmp.component_props.style };
        if (name) stylez[name] = value;
        if (typeof name === "string" && (value && name) !== undefined)
          stylez[name] = value;
        if (
          typeof name === ("number" || undefined) &&
          (value && name) !== undefined
        )
          stylez[name] = value;
        stylez.display = "flex";
        props.component_props.style = stylez;
        return props;
      }
      return cmp;
    });
    setComponents(itemStyleEdit);
  };

  /**Direct rerender to instantiate editable React.HTMLInputTypeAttribute */
  const renderEditable = (comp: DropComponents, props: Inputprops) => {
    if (
      comp.component_type === "text" &&
      comp.component === "input" &&
      comp.drop_id
    ) {
      return (
        <Item
          item={comp}
          itemToDrag={<input type="text" contentEditable="true" {...props} />}
        />
      );
    }
    if (
      comp.component_type === "date" &&
      comp.component === "input" &&
      comp.drop_id
    ) {
      return (
        <Item
          item={comp}
          itemToDrag={<input type="date" contentEditable="true" {...props} />}
        />
      );
    }
    if (
      comp.component_type === "image" &&
      comp.component === "logo" &&
      comp.drop_id
    ) {
      return <Item item={comp} itemToDrag={logoContainer} />;
    }
    if (
      comp.component_type === "div" &&
      comp.component === "container" &&
      comp.drop_id
    ) {
      return (
        <div></div>
      );
    }
    if (
      comp.component_type === "TextareaAutosize" &&
      comp.component === "input" &&
      comp.drop_id
    ) {
      return (
        <Item
          item={comp}
          itemToDrag={
            <TextareaAutosize
              aria-label="minimum height"
              className={styles.tA}
              minRows={3}
              style={{ width: 400, color: "#555" }}
            />
          }
        />
      );
    }
    if (
      comp.component_type === "text" &&
      comp.component === "Text" &&
      comp.drop_id
    ) {
      return (
        <Item
          item={comp}
          itemToDrag={
            <ResizableBox extCompSize={rT}>
              <span contentEditable="true" id={stx["Text"]} {...props}>
                Lorem
              </span>
            </ResizableBox>
          }
        />
      );
    }
    if (
      comp.component_type === "Header" &&
      comp.component === "input" &&
      comp.drop_id
    ) {
      return (
        <Item
          item={comp}
          itemToDrag={
            <input
              type="text"
              className={stx["header"]}
              contentEditable="true"
              {...props}
            />
          }
        />
      );
    }
    if (
      comp.component_type === "Title" &&
      comp.component === "input" &&
      comp.drop_id
    ) {
      return (
        <Item
          item={comp}
          itemToDrag={
            <input
              type="text"
              className={stx["topHeader"]}
              contentEditable="true"
              {...props}
            />
          }
        />
      );
    }
  };

  /**
   * <RxDiv item={components} addCompToDiv={addCompToDiv}/>
  <div
              className={styles["resizable_container"]}
              contentEditable="true"
              {...props}
            />

  <ResizableBox extCompSize={rT}>
              <span contentEditable="true" id={stx["Text"]} {...props} ref={txtspn}>
              Lorem
            </span>
            </ResizableBox> */

  const dropContainer: JSX.Element[] = [
    <DropWrapper addCompToPaper={addCompToPaper} setter={setComponents} className={stx["rxBx"]}>
      <>
        {components.map((i, idx) => {
          return (
            <div className={home_styles["component_div"]} key={i.drop_id}>
              {renderEditable(i, i.component_props)}
            </div>
          );
        })}
      </>
    </DropWrapper>,
  ];

  const initDiv: JSX.Element[] = [
    <div className={styles["initdiv"]}>
      <Typography>Drag a Component Here</Typography>
    </div>,
  ];

  const date_prop: JSX.Element[] = [
    <>
      <FormLabel>Date Properties</FormLabel>
      <input type={"text"} placeholder="placeholder" />
      <div className={styles["col"]}>
        <label>Border</label>
      </div>
    </>,
  ];

  const renderTextfieldProp = (dropid: number  ) => {
    return (
      <>
        <div className={stx["header"]}>
          <TextFields />
          <Typography>Textfield Properties</Typography>
        </div>
        <div className={stx["prop"]}>
          <label className={stx["labhdr"]}>PLACEHOLDER</label>
          <input
            type="text"
            placeholder="label"
            onChange={(e) =>
              handleInputPropertyChange(e, "placeholder", dropid)
            }
          />
        </div>
        <div className={stx["prop"]}>
          <label className={stx["labhdr"]}>COLOR</label>
          <EditableColorInput
            color={color}
            displayColorPicker={displayColorPicker}
            handleChange={(color) => handleColorChange(color, dropid)}
            handleClick={handleClick}
            handleClose={handleClose}
          />
        </div>
        <div className={stx.prop}>
          <EditableSlider
            name="HEIGHT"
            keys="fontSize"
            dropid={dropid}
            icon={<Height sx={{ fill: "#fff" }} />}
            value={slideValue}
            handleSliderChange={handleSliderChange}
            setValue={setSlideValue}
          />
        </div>
        <div className={stx.prop}>
          <EditableSlider
            name="WEIGHT"
            keys="fontWeight"
            dropid={dropid}
            icon={<LineWeight sx={{ fill: "#fff" }} />}
            value={slideValue}
            handleSliderChange={handleSliderChange}
            setValue={setSlideValue}
          />
        </div>
        <div className={stx.prop}>
          <label className={stx["labhdr"]}>FONT</label>
          <select
          name="font"
          title="font-Change"
            onChange={(e) => handleInputStyle(e, "fontFamily", dropid)}
          >
            <option value="sans-serif">sans-serif</option>
            <option value="monospace">monospace</option>
            <option value="fantasy">fantasy</option>
            <option value="cursive">cursive</option>
          </select>
        </div>
      </>
    );
  };

  const logo_prop: JSX.Element[] = [
    <>
      <FormLabel>Logo Properties</FormLabel>
    </>,
  ];

  const getChangedPos = (currentPos: number, newPos: number) => {
    console.log(currentPos, newPos);
  };

  return (
    <>
      <CreatorLayout>
        <Creatorbar />
        {/**<Editorbar
            handlePrint={() => alert("print")}
            handleSave={() => alert("save Invoice")}
          /> */}
        {/**<div className={styles["resizable_container"]} contentEditable="true"/> */}
        <CreatorBox>
          {/** {dropContainer} */}
          <DropWrapper addCompToPaper={addCompToPaper} setter={setComponents} className={stx["rxBx"]}>
            <>
              {components.map((i, idx) => {
                return (
                  <div className={home_styles["component_div"]} key={i.drop_id}>
                    {renderEditable(i, i.component_props)}
                  </div>
                );
              })}
            </>
          </DropWrapper>
          {/**<Droppable items={components} setter={setComponents} className={stx["rxBx"]}>
          {components.map((element, i) => (
            <Draggable draggableId={element.drop_id.toString()} index={i}>
            {(
              provided: DraggableProvided,
              snapshot: DraggableStateSnapshot,
              rubric: DraggableRubric
            ) => (
              <div
                className={styles.editorComp}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={element.drop_id}
              >
                {renderEditable(element, element.component_props)}
              </div>
            )}
            </Draggable>
          ))}
          </Droppable> */}
          {/**<DropWrapper addCompToPaper={addCompToPaper} setter={setComponents} className={stx["rxBx"]}>
            <>
              {components.map((i, idx) => {
                return (
                  <div className={home_styles["component_div"]} key={i.drop_id}>
                    {renderEditable(i, i.component_props)}
                  </div>
                );
              })}
            </>
          </DropWrapper> */}
        </CreatorBox>
        <CreatorPropsbar>
          {!components ? (
            <Image src={"/kwik_favicon.png"} width={30} height={30} />
          ) : (
            components?.map((cmp) => {
              if (cmp.root_id === 6 /**&& cmp.drop_id === currentEdit */)
                return (
                  <Fragment key={cmp.drop_id}>
                    {renderTextfieldProp(cmp.drop_id)}
                  </Fragment>
                );
            })
          )}
        </CreatorPropsbar>
      </CreatorLayout>
    </>
  );
};

export default kwik_creator;

/**{i.root_id !== 4 ? (
  <div className={home_styles["component_edit"]}>
  <button
    type="button"
    className={home_styles["image__edit"]}
    onClick={() => handleEdit(i.drop_id)}
  >
    Resize Image
  </button>

  <button
    type="button"
    className={home_styles["image__remove"]}
    onClick={() => handleRemove(i.drop_id)}
  >
    Remove
  </button>
</div>
) : null} */

/**
 * 
 * <DropWrapper
                addCompToPaper={addCompToPaper}
                setter={setNewValue}
                className={stx["resizable-container"]}
              >
                <>
                  {newValue.map((i, idx) => {
                    return (
                      <div
                        className={home_styles["component_div"]}
                        key={i.drop_id}
                      >
                        {renderEditable(i, i.component_props)}
                      </div>
                    );
                  })}
                </>
              </DropWrapper>
 * 
 * const removePaperComp = (compIndex) => {
    removeItemIcon(1); //opacity : 1
    const idx = components.findIndex((i) => i === compIndex);
    const componentList = components.filter((comp, i) => comp[i] !== idx);
    setComponents((comp) => [...comp, componentList[0]]);
  };

 *  const defineContainer = (element) => {
    if (element.type === "div")
      element.component = <div style={{ width: "50%", background: "#eee" }} />;
    return <Item item={element.component} id={element.id} />;
  };

 * const removeItemIcon = (num) => {
    return (
      <span
        className={styles.removeCompIcon}
        styles={{ opacity: num }} //opacity : 0
        onClick={() => removePaperComp()}
      >
        <RemoveCircle />
      </span>
    );
  };

 * const handleComponentProps = (e, rootid, stylepropname) => {
    const { name, styles } = e.target;
    components.forEach((comp) => {});
  };

  const moveComp = (id, nexid) => {};

  console.log(components);
 * 
 <input
        type={"text"}
        placeholder="placeholder"
        onChange={(e) => settextProps(e.target.value)}
      />

 const onDrop = (item, monitor) => {
    /**
     const mapping = component_data.findIndex(ci =>  ci.id === components)
    console.log(mapping)

    setComponents(prevState => {
      const newComp = prevState
      .filter(c => c.id !== item.id)
      .concat({...item, component: mapping.component}); //changed mapping.element to item.element
      return [...newComp]
    })

    setComponents(prevState => {
      const value = {
        id: Math.random * 100, 
        name: item.name,
        type: item.type,
        icon: item.icon,
        component: item.component
      }
      const newComp = prevState.filter(c => c.id !== item.id).concat({...value})

      return [...newComp]
    })
    const value = {
      id: Math.random * 100, 
      name: item.name,
      type: item.type,
      icon: item.icon,
      component: item.component
    }
    setComponents(prevValue => [...prevValue], value)
  }

   const moveItem = (dragIndex, hoverIndex) => {
    const item = components[dragIndex]
    setComponents(prevState =>  {
      const newComp = prevState.filter((i, idx) =>  idx !== dragIndex)
      newComp.splice(hoverIndex, 0, item)
      return [...newComp]
    })
  }

 */
//components.length > component_data.length ? DropContainer : initDiv
/*
{components.filter(i => i.component === component_data.component )
              .map((i, idx) => <Item item={i} index={idx} moveItem={moveItem} />)}
*/

//<Image src="/templateview.svg" width={300} height={300}/>

/*const creatorPanel = [
    <>
    <div className={styles['editorCompOuter']}>
      <div className={styles.editorComp}>
        <TextFields/>
      </div>
      <button className={styles.editorComp}
      >
        <DateRange/>
      </button>
      <div className={styles.editorComp}>
        <DataObject/>
      </div>
      <div className={styles.editorComp}>
        <LogoDev/>
      </div>
      <div className={styles.editorComp}>
        <TextFields/>
      </div>
      <div className={styles.editorComp}>
        <DateRange/>
      </div>
      <div className={styles.editorComp}>
        <DataObject/>
      </div>
      <div className={styles.editorComp}>
        <LogoDev/>
      </div>
    </div>
    </>
  ] */

/**
   * 
   * if (componentList[0].name === 'input' && componentList[0].type === 'text') {
      addedComponents = {
        root_id: componentList[0].id,
        drop_id: randomNumber,
        component: <input type={'text'} placeHolder="TextField"/>
      }
    }
   
  componentList.forEach(comp => {
      comp.drop_id = randomNumber
    }) 
    if (componentList[0].name === 'input' && componentList[0].type === 'text') {
      componentList[0].component = [
        <input type={'text'}/>
      ]
  }

  const componentList = component_data.filter(comp => id === comp.id)
    componentList.forEach(comp => {
      comp.drop_id = randomNumber
    }) */
/**componentList[0].filter(comp => {
      comp.drop_id = randomNumber
    }) */
