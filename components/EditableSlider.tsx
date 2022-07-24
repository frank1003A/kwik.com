import React, { ChangeEvent, FC, useState } from "react";
import { SyntheticEvent } from "react";
import styles from '../styles/Slider.module.css'
import { styleInputProps } from "./Data/Kwik_Creator/types";

interface Props {
    name?: string,
    keys: keyof styleInputProps,
    dropid: number,
    icon?: JSX.Element,
    value: number | string | Array<number | string>,
    handleSliderChange: (e: Event | SyntheticEvent<any, Event>, name: keyof styleInputProps, dropid:number) => void,
    setValue: React.Dispatch<React.SetStateAction<string | number | (string | number)[]>>
}

const EditableSlider: FC<Props> = ({name,keys, dropid, icon, value, handleSliderChange, setValue}) => {
  const MAX = 1000;
  const getBackgroundSize = (): React.CSSProperties => {
    return {
      backgroundSize: `${(Number(value) * 100) / MAX}% 100%`,
    };
  };

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) =>  {
    setValue(event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleBlur = () => {
    if (value < 0) {
        setValue(0)
    } else if (value > 100) {
        setValue(100)
    }
} 
  return (
    <div className={styles.edsSlider}>
        <span id={styles["name"]}>{name}</span>
      <div>
        <span id={styles['icon']}>{icon}</span>
      <input
        type="range"
        min="0"
        max={MAX}
        onChange={(e) => handleSliderChange(e, keys, dropid)}
        style={getBackgroundSize()}
        value={Number(value)}
      />
      <input type="number" value={value as number} onChange={handleInputChange} onBlur={handleBlur}/>
      </div>
    </div>
  );
};

export default EditableSlider;

/**const [value, setValue] = useState<number | string | Array<number | string>>(0);
  console.log(value)
  const MAX = 1000;
  const getBackgroundSize = (): React.CSSProperties => {
    return {
      backgroundSize: `${(value as number * 100) / MAX}% 100%`,
    };
  };

  const handleSliderChange= (event: React.ChangeEvent<HTMLInputElement>, newValue: number | number[] ) => {
    setValue(newValue) 
} 

const handleSliderChange= (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value) 
}

const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) =>  {
  setValue(event.target.value === '' ? '' : Number(event.target.value))
}

const handleBlur = () => {
  if (value < 0) {
      setValue(0)
  } else if (value > 100) {
      setValue(100)
  }
} */
