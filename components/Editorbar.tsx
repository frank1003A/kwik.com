import { GifBox, Image, Print, Save, Settings } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";

import btnStyles from "../styles/Button.module.css";
import styles from "../styles/Invoice.module.css";
import ButtonComponent from "./Button";

interface Props {
  handlePrint?: () => void;
  handleSave?: () => void;
  saveText?: string;
  status?: ReactNode;
  editController?: JSX.Element;
  updateDisabled?: boolean;
  handleVat?: () => void;
  exportPDF?: () => void;
  exportJPEG?: () => void;
  handleBP?: () => void
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
  exportJPEG,
  handleBP
}) => {
  const router = useRouter()
  return (
    <div className={styles.editorContainer}>
      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<Print />}
        innerText="PRINT"
        key={1}
        onClick={handlePrint}
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

      {
        router.pathname === "/invoice/create" ? (
          <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<GifBox />}
        innerText="Binded Products"
        onClick={handleBP}
        key={6}
      />
        ) : null
      }

      {editController}

      <div>
        <span>{status}</span>
      </div>
    </div>
  );
};

export default Editorbar;
