import { motion, Variants } from "framer-motion";
import React from "react";

type Text = {
  text: string;
};

interface Props {
  line: string[];
  className: string;
}

const AnimatedText = ({ line, className }: Props) => {
  const sentence: Variants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div>
      {line.map((line, index) => {
        return (
          <motion.h3 variants={sentence} initial="hidden" animate="visible" className={className}>
            {line.split("").map((char, idx) => {
              return <motion.div className={className} key={char + "_" + idx}>{char}</motion.div>;
            })}
          </motion.h3>
        );
      })}
    </div>
  );
};

export default AnimatedText;
