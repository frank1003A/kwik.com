import { DropComponents } from "../Data/Kwik_Creator/types";

// a little function to help us with reordering the result
export const reorder = (list: DropComponents[], startIndex: number , endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed); // inserting task in new index
  
    return result
  };  
  
  export const remove = (arr: Array<number>, index: number) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // part of the array after the specified index
    ...arr.slice(index + 1)
  ];
  
  export const insert = (arr: Array<number>, index: number, newItem: number) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ];
  
  