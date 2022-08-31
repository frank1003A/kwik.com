import React, {
  FC,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import styles from "../styles/Invoice.module.css";
import { Invoice } from "./Data/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertDateFormat } from "../utils/utils";

interface Props {
  handleDateInput: (date: Date, event: React.SyntheticEvent<any>) => void;
  selectedDate: Date;
  dateName: keyof Invoice;
  invoice: Invoice;
  customStyle?: React.CSSProperties;
  placeholderText?: string;
  disabled?: boolean
}

const EditableDate: FC<Props> = ({
  handleDateInput,
  customStyle,
  dateName,
  invoice,
  placeholderText,
  disabled 
}) => {
  /**typeof invoice[dateName] === "string"
            ? new Date(invoice[dateName] as string | number)
            : new Date() */
  return (
    <div>
      <DatePicker
        // selected={convertDateFormat(invoice[dateName] as string, "mm/dd/yyyy") as Date | null | undefined }
        selected={new Date(invoice[dateName] as string | number)}
        onChange={handleDateInput}
        placeholderText={placeholderText}
        dateFormat="MM-dd-yyyy"
        disabled={disabled}
      />
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
