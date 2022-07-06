import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeaderIcon from '@mui/icons-material/LineAxis'
import styles from '../styles/Invoice.module.css'

interface Props {
    headerChildren: JSX.Element,
    lineChildren: JSX.Element, 
    companyChildren: JSX.Element, 
    billingChildren: JSX.Element, 
  invoiceDetailChildren: JSX.Element, 
  tableChildren: JSX.Element, 
  notesChildren: JSX.Element, 
  tandcChildren: JSX.Element
}

export default function ControlledAccordions({
  headerChildren, lineChildren, companyChildren, billingChildren, 
  invoiceDetailChildren, tableChildren, notesChildren, tandcChildren
}:Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} className={styles['accxtra']} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Header
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {headerChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} className={styles['accxtra']} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Divider</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {lineChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} className={styles['accxtra']} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Company
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {companyChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} className={styles['accxtra']} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Billing Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {billingChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} className={styles['accxtra']} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Invoice Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {invoiceDetailChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel6'} className={styles['accxtra']} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Table</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {tableChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel7'} className={styles['accxtra']} onChange={handleChange('panel7')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Notes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {notesChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel8'} className={styles['accxtra']} onChange={handleChange('panel8')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Terms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {tandcChildren}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
