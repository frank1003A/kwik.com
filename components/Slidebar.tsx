import { Modal } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import styles from '../styles/Home.module.css';

interface Props  {
    sb: boolean;
    setsb: React.Dispatch<React.SetStateAction<boolean>>
}
const Slidebar = ({sb, setsb}: Props) => {
  return (
    <Modal
        open={sb}
        onClose={() => setsb((sb) => !sb)}
        >
    <AnimatePresence>
         {sb && (
        <>
        <motion.div
            initial={{ x: "100%" }}
            animate={{
              x: 0
            }}
            exit={{
              x: "100%"
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.75 }}
            //className="fixed bg-indigo-600 text-white shadow-lg top-0 right-0 w-full max-w-sm h-screen p-5"
            className={styles.slidebar}
          >
            <button
              onClick={() => setsb((sb) => !sb)}
              className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
            >
              &times;
            </button>
            <h2 className="text-4xl capitalize leading-loose">hello!</h2>
            <p className="leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={() => setsb((b) => !b)}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
        </>
      )}
    </AnimatePresence>
    </Modal>
  )
}

export default Slidebar