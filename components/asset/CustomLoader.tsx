import React, {useEffect, useState} from 'react'
import SquareLoader from 'react-spinners/SquareLoader'
import {useTheme} from "next-themes"
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'

interface Props {
  text?: string 
}

const CustomLoader = ({text}: Props) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
          layout
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <SquareLoader color={mounted && theme === "dark" ? "#FFA500" : "#2124b1"}/>
          <Typography>{text}</Typography>
        </motion.div>
  )
}

export default CustomLoader