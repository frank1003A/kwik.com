import React, { FC, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import styles from "../styles/Invoice.module.css";
import { Invoice } from "./Data/types";

interface Props {
  handleDateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDate: string;
  dateName: keyof Invoice;
  invoice: Invoice;
  customStyle?: React.CSSProperties;
  setter: (value: React.SetStateAction<Invoice>) => void
}

const EditableDate: FC<Props> = ({
  handleDateInput,
  customStyle,
  dateName,
  invoice,
  setter 
}) => {
  return (
    <div>
      {invoice[dateName] ? (
        <input
          type="text"
          defaultValue={invoice[dateName] as string}
          onDoubleClick={() => setter({...invoice, [dateName]: ""})}
          style={customStyle}
        />
      ) : (
        <input
          type="date"
          defaultValue={invoice[dateName] as string}
          onChange={handleDateInput}
          style={customStyle}
        />
      )}
    </div>
  );
};

export default EditableDate;

/**const selectedCinInvoice = useAppSelector(state => state.invoice.invoice)

  const clearDateValue = () => {
    dispatch(
      clearSelectValue({
      invName: dateName
    }))
  } */
