import React, { FC, SyntheticEvent, useState } from "react";
import styles from "../styles/Invoice.module.css";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
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
  TandC_Container 
 } from "../components/Data/default_template";
 import {initialInvoice, initialInvoiceItems} from '../components/Data/initialData'
import { Invoice, InvoiceItems } from "./Data/types";

 interface Props {
    options:{ value: string; text: string; }[],
    invoice: typeof initialInvoice,
    pdfMode: boolean,
    handleChange: (name: keyof Invoice, value: string| number | number[]) => void
    removeItem: (id: number | string | string[]) => void,
    addTC: () => void,
    cur: string,
    itemArr: typeof initialInvoiceItems[], 
    tR: number | undefined,
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    handleItemInput: (e: Event | SyntheticEvent<any, Event>, index: number, name: keyof InvoiceItems) => void,
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
    }:Props,
    ref:React.LegacyRef<HTMLDivElement>
  ) => {
    const [selectedColor, setselectedColor] = useState<string>('#2124B1')
    return (
      <div className={styles["invoice-box"]} ref={ref}>
        <div className={styles["draftnotice"]}>
          <Typography>Draft</Typography>
        </div>
        <div className={styles.top} id="trinfo">
          <Header
            logo={
                <LogoContainer
                  pdfMode={pdfMode}
                  handleChange={handleChange}
                  invoice={invoice}
                />
            }
            titleInput={
              <TitleContainer handleDetailInput={handleDetailInput} />
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
              handleDetailInput={handleDetailInput}
              options={options}
            />
          </div>

          <div className={styles.invInfo}>
            <RecieverSection handleDetailInput={handleDetailInput} />
            <InvoiceDescription
              handleDetailInput={handleDetailInput}
              invoice={invoice}
            />
          </div>

          <div
            style={{
              height: "auto",
              width: "100%",
              overflow: "auto",
              background: "#fff",
            }}
          >
            <InvoiceTable
              onChangeComplete={(color) => setselectedColor(color.hex)}
              selectedColor={selectedColor}
              cur={cur}
              itemArr={itemArr}
              removeItem={removeItem}
              handleItemInput={handleItemInput}
            />

            <div className={styles.btnAndTotal}>
              <Button_Add addTC={addTC} />

              <TotalContainer
                cur={cur}
                invoice={invoice}
                handleDetailInput={handleDetailInput}
                tR={tR}
              />
            </div>

            <NotesContainer 
            handleDetailInput={handleDetailInput}
             />

            <br />
            <br />
            <TandC_Container 
            handleDetailInput={handleDetailInput}
             />
          </div>
        </div>
      </div>
    );
  }
);

export default invoiceMain;
