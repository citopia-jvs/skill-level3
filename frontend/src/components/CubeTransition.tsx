// src/components/CubeTransition.tsx

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CubeTransitionProps {
    children: React.ReactNode;
}

const CubeTransition: React.FC<CubeTransitionProps> = ({ children }) => {
    useEffect(() => {
        // Add 'no-scroll' class to body when component mounts
        document.body.classList.add('no-scroll');

        // Remove 'no-scroll' class when component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="cube-container"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default CubeTransition;