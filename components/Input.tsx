import React from 'react'

interface Props{
    value: string | number;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    label:string
}

const Input = ({value, onChange, label}:Props) => {
  return (
    <div>
        <input type="text" placeholder={label} value={value} onChange={onChange} />
    </div>
  )
}

export default Input