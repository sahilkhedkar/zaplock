import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-[#0f0c29] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
     
    </motion.div>
  );
}
