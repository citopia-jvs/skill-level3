// src/components/CubeTransition.tsx

import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CubeTransitionProps {
    children: ReactNode;
}

const CubeTransition: React.FC<CubeTransitionProps> = ({ children }) => {
    const prefersReducedMotion = useReducedMotion();

    const variants = !prefersReducedMotion
        ? {
            initial: { rotateY: 90, opacity: 0 },
            animate: { rotateY: 0, opacity: 1 },
            exit: { rotateY: -90, opacity: 0 },
        }
        : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        };

    const transition = {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'easeInOut',
    };

    return (
        <motion.div
            className="cube-face"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
            style={{
                width: '100%',
                height: 'calc(100vh - 60px)', // Adjust based on nav height
                position: 'absolute',
                backfaceVisibility: 'hidden',
                top: 0,
                left: 0,
            }}
        >
            {children}
        </motion.div>
    );
};

export default CubeTransition;