import React, { FC, LegacyRef, SyntheticEvent, useState, Dispatch, SetStateAction} from "react";
import styles from "../styles/Invoice.module.css";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import {
  Header,
  LogoContainer,
  TitleContainer,
  CompanySection,
  RecieverSection,
  InvoiceDescription,
  InvoiceTable,
  Button_Add,
  TotalContainer,
  NotesContainer,
  TandC_Container,
} from "../components/Data/default_template";
import {
  initialInvoice,
  initialInvoiceItems,
} from "../components/Data/initialData";
import { Invoice, InvoiceItems } from "./Data/types";
import { Style } from "@mui/icons-material";

interface Props {
  options: { value: string; text: string }[];
  invoice: typeof initialInvoice;
  pdfMode: boolean;
  handleChange: (
    name: keyof Invoice,
    value: string | number | number[]
  ) => void;
  removeItem: (id: number | string | string[]) => void;
  addTC: () => void;
  cur: string;
  itemArr: typeof initialInvoiceItems[];
  tR: number | undefined;
  handleDetailInput: (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Invoice
  ) => void;
  handleItemInput: (
    e: Event | SyntheticEvent<any, Event>,
    index: number,
    name: keyof InvoiceItems
  ) => void;
  style?: React.CSSProperties,
  contentEditable?: boolean,
  id?:string,
  clientInputRef?:LegacyRef<HTMLDivElement>,
  customStyle?: React.CSSProperties,
  dateSet: Dispatch<SetStateAction<Invoice>>
  selClr: Dispatch<SetStateAction<Invoice>>
}

const invoiceMain = React.forwardRef(
  (
    {
      options,
      pdfMode,
      invoice,
      handleChange,
      removeItem,
      addTC,
      cur,
      itemArr,
      tR,
      handleDetailInput,
      handleItemInput,
      style,
      contentEditable,
      id,
      clientInputRef,
      customStyle,
      dateSet, 
      selClr
    }: Props,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const [selectedColor, setselectedColor] = useState<string>("#2124B1");
    return (
      <div className={styles["invoice-box"]} ref={ref} style={style}>
        <div className={styles.top} id="trinfo">
          <Header
            invoice={invoice}
            logo={
              <LogoContainer
                pdfMode={pdfMode}
                handleChange={handleChange}
                invoice={invoice}
              />
            }
            titleInput={
              <TitleContainer
                invoice={invoice}
                contentEditable={contentEditable}
                handleDetailInput={handleDetailInput}
                customStyle={customStyle}
              />
            }
          />

          <Divider
            sx={{
              borderColor: selectedColor,
              marginBottom: "2rem",
              marginTop: "1rem",
            }}
            id="dfdivider"
          />

          <div style={{ display: "flex", gap: "1rem", flexDirection: "row" }}>
            <CompanySection
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              options={options}
              setter={selClr}
              contentEditable={contentEditable}
              customStyle={customStyle}
            />
          </div>

          <div className={styles.invInfo} ref={clientInputRef}>
            <RecieverSection
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              contentEditable={contentEditable}
              id={id}
              customStyle={customStyle}
            />
            <InvoiceDescription
              handleDetailInput={handleDetailInput}
              invoice={invoice}
              setter={dateSet}
              contentEditable={contentEditable}
              customStyle={customStyle}
            />
          </div>

          <div
            style={{
              height: "auto",
              width: "100%",
              overflow: "auto",
              background: "transparent",
            }}
          >
            <InvoiceTable
              invoice={invoice}
              onChangeComplete={(color) => setselectedColor(color.hex)}
              selectedColor={selectedColor}
              cur={cur}
              itemArr={itemArr}
              removeItem={removeItem}
              handleItemInput={handleItemInput}
              customStyle={customStyle}
              contentEditable={contentEditable}
            />

            <div className={styles.btnAndTotal}>
              <Button_Add addTC={addTC} contentEditable={contentEditable} />

              <TotalContainer
                cur={cur}
                invoice={invoice}
                handleDetailInput={handleDetailInput}
                tR={tR}
                contentEditable={contentEditable}
                customStyle={customStyle}
              />
            </div>

            <NotesContainer
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              contentEditable={contentEditable}
              customStyle={customStyle}
            />

            <br />
            <br />
            <TandC_Container
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              contentEditable={contentEditable}
              customStyle={customStyle}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default invoiceMain;
