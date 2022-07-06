import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import currencyList from './Data/currencyList';

interface Props {
    state: string | number,
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    label: string,
    options: typeof currencyList
}

export default function SelectVariants({state, handleChange, label, options}:Props) {

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '100%' }}>
        <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
        <select
          value={state}
          onChange={handleChange}
          placeholder={label}
          
        >
          {options.map((option, i) =>  {
            return (
              <MenuItem value={option['symbol']} key={option['cc']}>
              {option['name']}
            </MenuItem>
            )
          })}
        </select>
      </FormControl>
    </div>
  );
}


