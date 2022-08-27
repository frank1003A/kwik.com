import React, {useEffect, useState} from 'react'
import SquareLoader from 'react-spinners/SquareLoader'
import {useTheme} from "next-themes"

const CustomLoader = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
    <SquareLoader color={mounted && theme === "dark" ? "#FFA500" : "#2124b1"}/>
    </>
  )
}

export default CustomLoader