import React, { Dispatch, SetStateAction } from "react";
import styles from "../styles/Invoice.module.css";
import { Invoice } from "./Data/types";

interface Props {
  options: { value: string; text: string }[];
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  invoice: Invoice;
  customStyle?: React.CSSProperties;
  setter: Dispatch<SetStateAction<Invoice>>
}

const EditableSelect = ({
  options,
  onSelectChange,
  invoice,
  customStyle,
  setter 
}: Props) => {

  return (
    <>
      {invoice.companyCountry ? (
        <input
          type="text"
          defaultValue={invoice.companyCountry}
          onDoubleClick={() => setter({...invoice, companyCountry: ""})}
          style={customStyle}
        />
      ) : (
        <select
          name="countrySelector"
          placeholder="Select Country"
          className={styles.select}
          value={invoice.companyCountry}
          onChange={onSelectChange}
          style={customStyle}
        >
          {options.map((option) => (
            <option key={option.text} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default EditableSelect;

/** const selectedCinInvoice = useAppSelector(state => state.invoice.invoice)

  const clearSelect = () => dispatch(clearSelectValue({
    invName: 'companyCountry'
  })) */
