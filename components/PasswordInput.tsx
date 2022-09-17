import { PanoramaFishEye, RemoveRedEye } from "@mui/icons-material";
import React, {useState} from "react";
import styles from "../styles/Home.module.css"

interface Props {
  value: string | number | readonly string[];
  placeholder: string;
  onChangeHandler:React.ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput = ({ value, onChangeHandler, placeholder }: Props) => {
    const [passwordShown, setPasswordShown] = useState(false);
  return (
    <div id={styles["cover"]}>
      <input
        value={value}
        type={passwordShown ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChangeHandler}
        autoComplete="off"
      />
      <button
      className={styles["typcn"]}
      onClick={() => setPasswordShown(!passwordShown)}
      >
       <RemoveRedEye htmlColor={passwordShown ? "#2124b1" : "#666"}/>
      </button>
    </div>
  );
};

export default PasswordInput;
