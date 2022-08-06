import React, { FC, ReactNode } from "react";
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/Invoice.module.css";
import ButtonComponent from "./Button";
import {
  Print,
  Save,
  Edit,
  EditAttributes,
  PictureAsPdf,
} from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";

interface Props {
  handlePrint?: () => void;
  handleSave?: () => void;
  saveText?: string;
  status?: ReactNode;
  editController?: JSX.Element,
  updateDisabled?: boolean
}

const Editorbar: FC<Props> = ({
  handlePrint,
  handleSave,
  saveText,
  status,
  editController,
  updateDisabled
}) => {
  return (
    <div className={styles.editorContainer}>
      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<PictureAsPdf />}
        innerText="PRINT"
        onClick={handlePrint}
      />

      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<Save />}
        btnDisabled={updateDisabled}
        innerText={saveText}
        onClick={handleSave}
      />

      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<EditAttributes />}
        innerText="COLOR SCHEME"
      />

      {editController}

      <div>
        <span>{status}</span>
      </div>
    </div>
  );
};

export default Editorbar;
