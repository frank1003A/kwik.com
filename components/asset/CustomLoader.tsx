import React, {useEffect, useState} from 'react'
import SquareLoader from 'react-spinners/SquareLoader'
import {useTheme} from "next-themes"
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import { BarLoader } from 'react-spinners'

interface Props {
  text?: string ,
  /**loader type */
  loadAnimation?: JSX.Element
}

const CustomLoader = ({text, loadAnimation}: Props) => {
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
          {!loadAnimation ? (
            <BarLoader color={mounted && theme === "dark" ? "#FFA500" : "#2124b1"}/>
          ): (
            loadAnimation
          )}
          <Typography>{text}</Typography>
        </motion.div>
  )
}

export default CustomLoader