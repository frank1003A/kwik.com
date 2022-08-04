import React, {FC} from 'react'
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
import { TextareaAutosize } from "@mui/material";
import ButtonComponent from "../../Button";
import AddIcon from "@mui/icons-material/Add";
import {
  BAProps,
  CSProps,
  HProps,
  IDProps,
  ITProps,
  LcProps,
  NCProps,
  RSProps,
  TACProps,
  TCNProps,
  TcProps} from "./types"


/**Default Template Invoice Logo Container */
export const LogoContainer: FC<LcProps> = ({pdfMode, handleChange,invoice}) =>  {
    return (
        <div className={styles.title} id="dflogo">
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
    )
}

/**Default Template Title Container */
export const TitleContainer: FC<TcProps> = ({handleDetailInput, invoice, contentEditable}) =>  {
    return (
        <div id="dftitle">
          <input
            type="text"
            className={styles.topHeader}
            placeholder="Invoice Type"
            disabled={!contentEditable ? false : contentEditable}
            value={invoice.title}
            onChange={(e) => handleDetailInput(e, "title")}
          />
        </div>
    )
}

/**Default Template Invoice Header */
export const Header: FC<HProps> = ({titleInput ,logo}) => {
    return (
      <div className={styles.topLogo} id="dfheader">
        {logo}
        {titleInput}
      </div>
    );
}

/**Default Template Company Section */
export const CompanySection: FC<CSProps> = ({handleDetailInput, options, invoice}) => {
    return (
        <div className={styles.sectionTwo} id="dfcompanydetail">
            <input
              type="text"
              className={styles.header}
              placeholder="Company Name"
              value={invoice.companyName}
              onChange={(e) => handleDetailInput(e, "companyName")}
            />
            <input
              type="text"
              placeholder="Companys Address"
              value={invoice.companyAddress}
              onChange={(e) => handleDetailInput(e, "companyAddress")}
            />
            <input
              type="text"
              placeholder="City, State, Zip"
              value={invoice.companyAddress2}
              onChange={(e) => handleDetailInput(e, "companyAddress2")}
            />
            <EditableSelect
              options={options}
              invoice={invoice}
              onSelectChange={(e) => handleDetailInput(e, "companyCountry")}
            />
          </div>
    )
}

/**Default Template Reciever Section: Billed To*/
export const RecieverSection: FC<RSProps> = ({handleDetailInput, invoice}) => {
    return (
            <div className={styles.sendTO} id="dfbilldetail">
              <input
                type="text"
                className={styles.header}
                placeholder="Billed To"
                value={invoice.billTo}
                onChange={(e) => handleDetailInput(e, "billTo")}
              />
              <input
                type="text"
                placeholder="Client's Name"
                value={invoice.clientName}
                onChange={(e) => handleDetailInput(e, "clientName")}
              />
              <input
                type="text"
                placeholder="Client's Address"
                value={invoice.clientAddress}
                onChange={(e) => handleDetailInput(e, "clientAddress")}
              />
              <input
                type="text"
                placeholder="City, State, Zip"
                value={invoice.clientAddress2}
                onChange={(e) => handleDetailInput(e, "clientAddress2")}
              />
            </div>
    )
}

/** 
 * per the default template
 * RecieverSection and InvoiceDescription will have a div container: <div className={styles.invInfo}></div>*
 * className : invInfo
*/

/**default template Invoice information */
export const InvoiceDescription:FC<IDProps> = ({handleDetailInput, invoice}) =>  {
    return (
        <div className={styles.invDetails} id="dfinvoicedetail">
              <input
                type="text"
                className={styles.header}
                placeholder="Invoice Details"
                value={invoice.invoicedetailsheader}
                onChange={(e) => handleDetailInput(e, "invoicedetailsheader")}
              />
              <div className={styles.mainInvDet}>
                <input
                  type="text"
                  placeholder="Invoice#"
                  value={invoice.invoiceTitleLabel}
                  onChange={(e) => handleDetailInput(e, "invoiceTitleLabel")}
                />
                :
                <input
                  type="text"
                  placeholder=" 123"
                  value={invoice.invoiceTitle}
                  disabled
                  onChange={(e) => handleDetailInput(e, "invoiceTitle")}
                />
                <input
                  type="text"
                  placeholder="Invoice Date"
                  value={invoice.invoiceDateLabel}
                  onChange={(e) => handleDetailInput(e, "invoiceDateLabel")}
                />
                :
                <EditableDate
                  selectedDate={invoice.invoiceDate}
                  dateName={"invoiceDate"}
                  invoice={invoice}
                  handleDateInput={(e) => handleDetailInput(e, "invoiceDate")}
                />
                <input
                  type="text"
                  placeholder="Due Date"
                  value={invoice.invoiceDueDateLabel}
                  onChange={(e) => handleDetailInput(e, "invoiceDueDateLabel")}
                />
                :
                <EditableDate
                  selectedDate={invoice.invoiceDueDate}
                  invoice={invoice}
                  dateName={"invoiceDueDate"}
                  handleDateInput={(e) =>
                    handleDetailInput(e, "invoiceDueDate")
                  }
                />
              </div>
            </div>
    )
}

/**Default Template Invoice Table: MUI Table*/
export const InvoiceTable: FC<ITProps> = ({
    onChangeComplete, 
    selectedColor, 
    cur, 
    itemArr, 
    removeItem,
    handleItemInput
}) => {
    return (
        <TableContainer component={Paper} className={styles.table} id="dfinvoicetable">
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
                  <TableHead
                    sx={{ background: selectedColor, textAlign: "center" }}
                  >
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
                      <TableCell
                        align="left"
                        sx={{ color: "#fff" }}
                      ></TableCell>
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
                        }}
                      >
                        <TableCell align="left">
                          <TextareaAutosize
                            aria-label="minimum height"
                            className={styles.tA}
                            minRows={2}
                            style={{ width: 200, height: 28, color: '#555' }}
                            placeholder="item description"
                            value={inv.description}
                            onChange={(e) =>
                                handleItemInput(e, i, "description")
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <input
                            className={styles.tableInput}
                            type="text"
                            placeholder="2"
                            value={inv.quantity}
                            onChange={(e) =>
                              handleItemInput(e, i, "quantity")
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <input
                            className={styles.tableInput}
                            type="text"
                            placeholder="1000"
                            value={inv.rate}
                            onChange={(e) => handleItemInput(e, i, "rate")}
                          />
                        </TableCell>
                        <TableCell align="center">{inv.amount}</TableCell>
                        <TableCell align="center">
                          <DeleteForeverRounded
                            className={styles.deleteIcon}
                            onClick={() => {
                              removeItem(inv._id !== undefined ? inv._id.toString() : 0);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
    )
}

/**default button for adding new item line*/
export const Button_Add: FC<BAProps> = ({addTC}) => {
    return (
        <div className={styles.addBtn}>
                    <ButtonComponent
                    id={styles.btnadd}
                    onClick={() => addTC()}
                    icon={<AddIcon />}
                  />
              </div>
    )
}

/**Sub Total, Tax and Total Container */
export const TotalContainer:FC<TCNProps> = ({cur, invoice, handleDetailInput, tR}) => {
    return (
        <div className={styles.totalInfo}>
                <div className={styles.subTotal}>
                  <input
                    type="text"
                    placeholder={`Sub Total`}
                    value={invoice.subTotalLabel}
                    onChange={(e) => handleDetailInput(e, "subTotalLabel")}
                  />{" "}
                  <Typography>
                    {invoice.subTotal
                      ? `${cur} ${invoice.subTotal}`
                      : "0.00"}
                  </Typography>
                </div>
                <div className={styles.vat}>
                  <input
                    type="text"
                    placeholder={`Sale Vat/Tax`}
                    value={invoice.taxLabel}
                    onChange={(e) => handleDetailInput(e, "taxLabel")}
                  /><Typography>{`(${tR !== (0 || undefined) ? tR : 0}) %`}</Typography>
                  <Typography>
                    {tR !== (0 || undefined) ? `${cur} ${invoice.tax}` : 0}
                  </Typography>
                </div>
                <div className={styles.total}>
                  <input
                    className={styles.totalText}
                    type="text"
                    placeholder="Total"
                    value={invoice.totalLabel}
                    onChange={(e) => handleDetailInput(e, "totalLabel")}
                  />
                  <Typography variant="h6" fontWeight={800}>
                    {invoice.total ? `${cur} ${invoice.total}` : "0.00"}
                  </Typography>
                </div>
              </div>
    )
}

/**Notes Section: Default Template*/
export const NotesContainer:FC<NCProps> = ({handleDetailInput, invoice}) => {
    return (
        <div id="dfinvoicenotes">
        <input
              type="text"
              className={styles.header}
              placeholder="Notes"
              value={invoice.notesLabel}
              onChange={(e) => handleDetailInput(e, "notesLabel")}
            />
            <br />
            <TextareaAutosize
              aria-label="minimum height"
              className={styles.tA}
              minRows={3}
              onChange={(e) => handleDetailInput(e, "notes")}
              value={invoice.notes}
              placeholder="It was great doing buisness with you"
              style={{ width: 400 , color: '#555'}}
            />
        </div>
    )
}

/** */
export const TandC_Container:FC<TACProps> = ({handleDetailInput, invoice}) => {
    return (
        <div id="dfinvoicetandc">
        <input
              type="text"
              className={styles.header}
              placeholder="Terms & Condition"
              value={invoice.termLabel}
              onChange={(e) => handleDetailInput(e, "termLabel")}
            />
            <TextareaAutosize
              aria-label="minimum height"
              className={styles.tA}
              minRows={3}
              value={invoice.term}
              onChange={(e) => handleDetailInput(e, "term")}
              placeholder="please make payments by due date"
              style={{ width: 685 , color: '#555'}}
            />
        </div>
    )
}

