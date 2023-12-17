"use client";
import { ThemeContext } from "@/utils/theme";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Button } from "@nextui-org/react";

const ThemeToggleButton = () => {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          aria-label="Toggle theme"
          className="bg-purple-600 dark:bg-orange-400 text-white dark:text-black text-lg w-[40px] min-w-0 px-0"
          onClick={() => {
            toggle();
          }}
        >
          {theme === "light" ? <MdDarkMode /> : <CiLight />}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleButton;
