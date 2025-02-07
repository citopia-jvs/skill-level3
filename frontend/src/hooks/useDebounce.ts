// src/hooks/useDebounce.ts

import { useEffect } from 'react';

/**
 * A custom hook that debounces a function call by a specified delay.
 * @param effect The effect function to debounce.
 * @param delay The delay in milliseconds.
 * @param deps The dependency array.
 */
export const useDebounce = (effect: () => void, delay: number, deps: any[]) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            effect();
        }, delay);

        // Cleanup function cancels the timeout if the effect is re-run or component unmounts
        return () => {
            clearTimeout(handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...(deps || []), delay]);
};