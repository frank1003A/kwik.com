import React from 'react'
import { Modal, Box, Typography } from '@mui/material'

interface Props{
    children: JSX.Element[] | JSX.Element,
    OpenModal: boolean,
    handleCloseModal: () => void, 
    pd: string
}

const ModalComponent = ({children, OpenModal, handleCloseModal, pd}:Props) => {
    /**modal */
  const style: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    boxShadow: "24px",
    maxWidth: "400px",
    width: "350px",
    padding: "2rem",
    borderColor: "none",
    overflow: "hidden",
    borderRadius: "8px",
  };
  /**modal end */
  return (
    <div>
        <Modal
              open={OpenModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {children}
                </Typography>
              </Box>
            </Modal>
    </div>
  )
}

export default ModalComponent