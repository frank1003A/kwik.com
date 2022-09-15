import React, { FC, Dispatch, SetStateAction } from "react";
import EditableImageFile from "../../EditableImageFile";
import styles from "../../../styles/Invoice.module.css";
import EditableSelect from "../../EditableSelect";
import { DeleteForeverRounded } from "@mui/icons-material";
import { BlockPicker } from "react-color";
import Tippy from "@tippyjs/react";
import { Divider } from "@mui/material";
import EditableDate from "../../EditableDate";
import { Typography } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
} from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import ButtonComponent from "../../Button";
import AddIcon from "@mui/icons-material/Add";
import {
  AddBtnProps,
  CompanyProps,
  HeaderProps,
  InvoiceDescriptionProps,
  TableProps,
  LogoProps,
  NotesContainerProps,
  RecieverProps,
  TermsAndConditionProps,
  TotalContainerProps,
  TitleContainerProps,
} from "./types";
import { motion } from "framer-motion";
import { NumericFormat } from 'react-number-format';

/**Default Template Invoice Logo Container */
export const LogoContainer: FC<LogoProps> = ({
  pdfMode,
  handleChange,
  invoice,
  logo,
}) => {
  return (
    <div className={styles.title} id="dflogo" style={{ display: logo }}>
      <EditableImageFile
        className="logo"
        placeholder="Company Logo"
        value={invoice.logo}
        width={invoice.logoWidth}
        pdfMode={pdfMode}
        onChangeImage={(value) => handleChange!("logo", value)}
        onChangeWidth={(value) => handleChange!("logoWidth", value)}
      />
    </div>
  );
};

/**Default Template Title Container */
export const TitleContainer: FC<TitleContainerProps> = ({
  handleDetailInput,
  invoice,
  contentEditable,
  customStyle,
  titlebox,
}) => {
  return (
    <div id="dftitle" style={{ display: titlebox }}>
      <input
        type="text"
        className={styles.topHeader}
        placeholder="Invoice Type"
        disabled={!contentEditable ? false : contentEditable}
        value={invoice.title}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "title")}
      />
    </div>
  );
};

/**Default Template Invoice Header */
export const Header: FC<HeaderProps> = ({
  titleInput,
  logo,
  hsStyleOverride,
}) => {
  return (
    <motion.div
      transition={{ ease: "easeInOut" }}
      className={styles.topLogo}
      style={{ display: hsStyleOverride }}
      id="dfheader"
    >
      {logo}
      {titleInput}
    </motion.div>
  );
};

/**Default Template Company Section */
export const CompanySection: FC<CompanyProps> = ({
  handleDetailInput,
  options,
  invoice,
  contentEditable,
  customStyle,
  setter,
}) => {
  return (
    <div className={styles.sectionTwo} id="dfcompanydetail">
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        className={styles.header}
        placeholder="Company Name"
        value={invoice.companyName}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "companyName")}
      />
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        placeholder="Companys Address"
        value={invoice.companyAddress}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "companyAddress")}
      />
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        placeholder="City, State, Zip"
        value={invoice.companyAddress2}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "companyAddress2")}
      />
      {/**Compoenent */}
      <EditableSelect
        options={options}
        setter={setter}
        invoice={invoice}
        onSelectChange={(e) => handleDetailInput(e, "companyCountry")}
        customStyle={customStyle}
      />
    </div>
  );
};

/**Default Template Reciever Section: Billed To*/
export const RecieverSection: FC<RecieverProps> = ({
  handleDetailInput,
  invoice,
  contentEditable,
  id,
  ref,
  customStyle,
}) => {
  return (
    <div className={styles.sendTO} id="dfbilldetail">
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        className={styles.header}
        placeholder="Billed To"
        value={invoice.billTo}
        id={id}
        ref={ref}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "billTo")}
      />
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        placeholder="Client's Name"
        value={invoice.clientName}
        id={id}
        ref={ref}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "clientName")}
      />
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        placeholder="Client's Address"
        value={invoice.clientAddress}
        id={id}
        ref={ref}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "clientAddress")}
      />
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        placeholder="City, State, Zip"
        value={invoice.clientAddress2}
        id={id}
        ref={ref}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "clientAddress2")}
      />
    </div>
  );
};

/**
 * per the default template
 * RecieverSection and InvoiceDescription
 * will have a div container: <div className={styles.invInfo}></div>*
 * className : invInfo
 */

/**default template Invoice information */
export const InvoiceDescription: FC<InvoiceDescriptionProps> = ({
  handleDetailInput,
  handleDateInput,
  invoice,
  contentEditable,
  customStyle,
}) => {
  return (
    <div className={styles.invDetails} id="dfinvoicedetail">
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        className={styles.header}
        placeholder="Invoice Details"
        value={invoice.invoicedetailsheader}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "invoicedetailsheader")}
      />
      <div className={styles.mainInvDet}>
        <input
          type="text"
          disabled={!contentEditable ? false : contentEditable}
          placeholder="Invoice#"
          value={invoice.invoiceTitleLabel}
          style={customStyle}
          onChange={(e) => handleDetailInput(e, "invoiceTitleLabel")}
        />
        :
        {/**
         * This input is disabled because the value
         * it will be generated at the frontend
         */}
        <input
          type="text"
          placeholder=" 123"
          value={invoice.invoiceTitle}
          disabled
          style={customStyle}
          onChange={(e) => handleDetailInput(e, "invoiceTitle")}
        />
        <input
          type="text"
          disabled={!contentEditable ? false : contentEditable}
          placeholder="Invoice Date"
          value={invoice.invoiceDateLabel}
          style={customStyle}
          onChange={(e) => handleDetailInput(e, "invoiceDateLabel")}
        />
        :{/**Component */}
        <EditableDate
          selectedDate={invoice.invoiceDate}
          dateName={"invoiceDate"}
          invoice={invoice}
          handleDateInput={(date, e) => handleDateInput(date, e, "invoiceDate")}
          customStyle={customStyle}
          disabled={!contentEditable ? false : contentEditable}
          placeholderText="Invoice Date"
        />
        <input
          type="text"
          disabled={!contentEditable ? false : contentEditable}
          placeholder="Due Date"
          value={invoice.invoiceDueDateLabel}
          style={customStyle}
          onChange={(e) => handleDetailInput(e, "invoiceDueDateLabel")}
        />
        :{/**Component */}
        <EditableDate
          selectedDate={invoice.invoiceDueDate}
          invoice={invoice}
          dateName={"invoiceDueDate"}
          handleDateInput={(date, e) =>
            handleDateInput(date, e, "invoiceDueDate")
          }
          customStyle={customStyle}
          disabled={!contentEditable ? false : contentEditable}
          placeholderText="Due Date"
        />
      </div>
    </div>
  );
};

/**Default Template Invoice Table: MUI Table*/
export const InvoiceTable: FC<TableProps> = ({
  onChangeComplete,
  selectedColor,
  cur,
  itemArr,
  invoice,
  removeItem,
  handleItemInput,
  contentEditable,
  customStyle,
}) => {
  return (
    <TableContainer
      component={Paper}
      className={styles.table}
      id="dfinvoicetable"
    >
      <Table
        sx={{ minWidth: 650, border: "transparent", borderRadius: "0" }}
        aria-label="simple table"
        id="tablegen"
      >
        <Tippy
          interactive={true}
          placement="top-start"
          content={
            <BlockPicker
              color={selectedColor}
              onChangeComplete={onChangeComplete}
            />
          }
        >
          <TableHead sx={{ background: selectedColor, textAlign: "center" }}>
            <TableRow sx={{ color: "#fff", textAlign: "center" }}>
              <TableCell align="left" sx={{ color: "#fff" }}>
                Item Description
              </TableCell>
              <TableCell align="left" sx={{ color: "#fff" }}>
                Quantity
              </TableCell>
              <TableCell align="left" sx={{ color: "#fff" }}>
                Rate {cur}
              </TableCell>
              <TableCell align="left" sx={{ color: "#fff" }}>
                Amount {cur}
              </TableCell>
              <TableCell align="left" sx={{ color: "#fff" }}></TableCell>
            </TableRow>
          </TableHead>
        </Tippy>
        <TableBody>
          {itemArr?.map((inv, i) => {
            return (
              <TableRow
                key={inv._id?.toString()}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  transition: "ease-in-out",
                  animation: "ease-in-out",
                  animationName: "-moz-initial",
                }}
              >
                <TableCell align="left">
                  <TextareaAutosize
                    aria-label="minimum height"
                    className={styles.tA}
                    minRows={2}
                    style={{ height: 28, width: 200, color: !customStyle?.color ? "#555" : customStyle.color }}
                    maxLength={200}
                    placeholder="item description"
                    value={inv.description}
                    disabled={!contentEditable ? false : contentEditable}
                    onChange={(e) => handleItemInput(e, i, "description")}
                  />
                  {/**{ width: 200, height: 28, color: "#555", ...customStyle } */}
                </TableCell>
                <TableCell align="center" aria-disabled>
                  <input
                    className={styles.tableInput}
                    type="text"
                    placeholder="number"
                    value={inv.quantity}
                    style={customStyle}
                    disabled={!contentEditable ? false : contentEditable}
                    onChange={(e) => handleItemInput(e, i, "quantity")}
                  />
                </TableCell>
                <TableCell align="center">
                  <NumericFormat
                    thousandSeparator={true}
                    prefix={invoice.currency_symbol}
                    className={styles.tableInput}
                    displayType="input"
                    placeholder="1000"
                    value={inv.rate}
                    disabled={!contentEditable ? false : contentEditable}
                    style={customStyle}
                    onValueChange={({ value }) =>
                      handleItemInput(value, i, "rate")
                    }
                    renderText={(value) => value}
                  />
                </TableCell>
                <TableCell align="center" style={customStyle}>
                  <NumericFormat
                    thousandSeparator={true}
                    displayType="text"
                    prefix={invoice.currency_symbol}
                    value={inv.amount}
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverRounded
                    className={styles.deleteIcon}
                    onClick={() => {
                      removeItem(
                        inv._id !== undefined ? inv._id.toString() : 0
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/**
 * default button for adding new item line:
 * mainly targeting the look and feel
 * not the functionality
 * */
export const Button_Add: FC<AddBtnProps> = ({ addTC, contentEditable }) => {
  return (
    <div className={styles.addBtn}>
      <ButtonComponent
        id={styles.btnadd}
        onClick={() => addTC()}
        icon={<AddIcon />}
        btnDisabled={!contentEditable ? false : contentEditable}
      />
    </div>
  );
};

/**Sub Total, Tax and Total Container */
export const TotalContainer: FC<TotalContainerProps> = ({
  cur,
  invoice,
  handleDetailInput,
  tR,
  contentEditable,
  customStyle,
}) => {
  return (
    <div className={styles.totalInfo}>
      <div className={styles.subTotal}>

        {/**Sub total label*/}
        <input
          type="text"
          placeholder={`Sub Total`}
          value={invoice.subTotalLabel}
          style={customStyle}
          onChange={(e) => handleDetailInput(e, "subTotalLabel")}
        />

        {/**Sub Total*/}
        <NumericFormat
          thousandSeparator={true}
          displayType="text"
          prefix={invoice.currency_symbol}
          value={invoice.subTotal ? `${cur} ${invoice.subTotal}` : "0.00"}
        />
      </div>
      <div className={styles.vat}>
        {/**Tax Label*/}
        <input
          type="text"
          placeholder={`Sale Vat/Tax`}
          value={invoice.taxLabel}
          style={customStyle}
          onChange={(e) => handleDetailInput(e, "taxLabel")}
        />
        {/**Tax Rate percentage */}
        <Typography style={customStyle}>
          {`(${
            invoice.tax
              ? Math.round(((invoice.tax / Number(invoice.total)) * 100) / 1)
              : 0
          }) %`}
        </Typography>

        {/**Actual Tax*/}
        <NumericFormat
          thousandSeparator={true}
          style={customStyle}
          displayType="text"
          prefix={invoice.currency_symbol}
          value={
            invoice.tax !== (0 || undefined)
              ? `${invoice.currency_symbol} ${invoice.tax}`
              : 0
          }
        />
      </div>
      <div className={styles.total}>

        {/**Total label*/}
        <input
          className={styles.totalText}
          type="text"
          placeholder="Total"
          value={invoice.totalLabel}
          style={customStyle}
          onChange={(e) => handleDetailInput(e, "totalLabel")}
        />

        {/**Total */}
        <NumericFormat
          thousandSeparator={true}
          displayType="text"
          style={{ fontWeight: 800, fontSize: "x-large", ...customStyle }}
          prefix={invoice.currency_symbol}
          value={
            invoice.total
              ? `${invoice.currency_symbol} ${invoice.total}`
              : "0.00"
          }
        />
      </div>
    </div>
  );
};

/**Notes Section: Default Template*/
export const NotesContainer: FC<NotesContainerProps> = ({
  handleDetailInput,
  notes,
  invoice,
  contentEditable,
  customStyle,
}) => {
  return (
    <div id="dfinvoicenotes" style={{ display: notes }}>

      {/**Notes label*/}
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        className={styles.header}
        placeholder="Notes"
        value={invoice.notesLabel}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "notesLabel")}
      />

      <br />

      {/**Notes*/}
      <TextareaAutosize
        aria-label="minimum height"
        disabled={!contentEditable ? false : contentEditable}
        className={styles.tA}
        minRows={3}
        onChange={(e) => handleDetailInput(e, "notes")}
        value={invoice.notes}
        placeholder="It was great doing buisness with you"
        style={{ height: 28, width: 400, color: !customStyle?.color ? "#555" : customStyle.color }}
        maxLength={200}
      />
    </div>
  );
};

/** */
export const TandC_Container: FC<TermsAndConditionProps> = ({
  handleDetailInput,
  invoice,
  contentEditable,
  customStyle,
  tanc,
}) => {
  return (
    <div id="dfinvoicetandc" style={{ display: tanc }}>

      {/**Term label*/}
      <input
        type="text"
        disabled={!contentEditable ? false : contentEditable}
        className={styles.header}
        placeholder="Terms & Condition"
        value={invoice.termLabel}
        style={customStyle}
        onChange={(e) => handleDetailInput(e, "termLabel")}
      />

      {/**Term*/}
      <TextareaAutosize
        aria-label="minimum height"
        disabled={!contentEditable ? false : contentEditable}
        className={styles.tA}
        minRows={3}
        value={invoice.term}
        onChange={(e) => handleDetailInput(e, "term")}
        placeholder="please make payments by due date"
        style={{ height: 28, width: 685, color: !customStyle?.color ? "#555" : customStyle.color }}
        maxLength={200}
      />
    </div>
  );
};
