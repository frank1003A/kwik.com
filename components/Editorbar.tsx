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
  Percent,
  Settings,
  Image,
} from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";

interface Props {
  handlePrint?: () => void;
  handleSave?: () => void;
  saveText?: string;
  status?: ReactNode;
  editController?: JSX.Element,
  updateDisabled?: boolean,
  handleVat?: () => void,
  exportPDF?: () => void,
  exportJPEG?: () => void
}

const Editorbar: FC<Props> = ({
  handlePrint,
  handleSave,
  saveText,
  status,
  editController,
  updateDisabled,
  handleVat,
  exportPDF,
  exportJPEG
}) => {
  return (
    <div className={styles.editorContainer}>
      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<Print/>}
        innerText="PRINT"
        key={1}
        onClick={handlePrint}
      />

      <ButtonComponent
      icon={<PictureAsPdf />}
      className={btnStyles.muiButtonBackground}
      innerText="PDF"
      onClick={exportPDF}
      key={2}
      />

     <ButtonComponent
      icon={<Image />}
      className={btnStyles.muiButtonBackground}
      innerText="JPEG"
      onClick={exportJPEG}
      key={3}
      />

      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<Save />}
        btnDisabled={updateDisabled}
        innerText={saveText}
        onClick={handleSave}
        key={4}
      />

      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<Settings />}
        innerText="Custom Settings"
        onClick={handleVat}
        key={5}
      />

      {editController}

      <div>
        <span>{status}</span>
      </div>
    </div>
  );
};

export default Editorbar;
