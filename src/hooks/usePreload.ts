import { useEffect } from 'react';

export const usePreload = (importFunction: () => Promise<unknown>, condition = true) => {
  useEffect(() => {
    if (condition) {
      // Preload component saat kondisi terpenuhi
      const timer = setTimeout(() => {
        importFunction().catch(console.error);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [importFunction, condition]);
};