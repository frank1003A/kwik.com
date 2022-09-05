import NextNProgress from "nextjs-progressbar";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Loading = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextNProgress
      color={mounted && theme === "dark" ? "#FFF500" :"#2124b1"}
    />
  );
};

export default Loading;
