import React, {FC} from 'react'

interface Props {
    isOver: boolean, 
    children: React.ReactChild[]
}
const Col: FC<Props> = ({isOver, children}) => {
  const className = isOver ? "highlight-region" : ""
  return (
      <div className={`col${className}`}>
          {children}
      </div>
  )
}

export default Col