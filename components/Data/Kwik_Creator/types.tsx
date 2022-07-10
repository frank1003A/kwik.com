export interface Components {
    id: number,
    name: "input" | "container" | "logo",
    type: "text" | "date" | "div" | "image" | "TextareaAutosize",
    icon: JSX.Element
}

type Booleanish = {
    contentEditable: ("true" | "false") | "inherit" | undefined
}

/** Input */

export interface styleInputProps {
    color?: string,
    fontFamily?: string,
    fontSize?: string | number ,
    fontWeight?: number
}

export type Inputprops = {
    placeholder?: string,
    style: styleInputProps
  }

/** */
export interface DropComponents {
    root_id: number,
    drop_id: number,
    component: "input" | "container" | "logo",
    component_type: "text" | "date" | "div" | "image" | "TextareaAutosize",
    component_props: Inputprops
}

