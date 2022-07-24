export interface Components {
    id: number,
    name: "input" | "container" | "logo" | "Text" | "prompt" | "divider",
    type: "text" | "date" | "div" | "image" | "TextareaAutosize" | "Header" | "Title" | "Prompt" | "divider",
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
    /**
     * The width styleInputProps property sets an element's width. 
     * By default, it sets the width of the content area, 
     * but if box-sizing is set to border-box, 
     * it sets the width of the border area.
     */
    width?:number,
    /**initialized display interface -> flex */
    display?: string,
    /**
     * The opacity styleInputProps property sets the opacity of an element. 
     * Opacity is the degree to which content behind an element is hidden, 
     * and is the opposite of transparency.
     * Its default value is between 1 and 0 */
    opacity?: number | string
}

export type Inputprops = {
    placeholder?: string,
    style: styleInputProps
  }

/** */
export interface DropComponents {
    root_id: number,
    drop_id: number | string,
    component: "input" | "container" | "logo" | "Text" | "prompt" | "divider",
    component_type: "text" | "date" | "div" | "image" | "TextareaAutosize" | "Header" | "Title" | "Prompt" | "divider",
    component_props: Inputprops
}