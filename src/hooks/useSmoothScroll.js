import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((target, options = {}) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: options.block || 'start',
        inline: options.inline || 'nearest'
      });
    }
  }, []);

  const scrollToTop = useCallback((options = {}) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      ...options
    });
  }, []);

  const scrollToBottom = useCallback((options = {}) => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
      ...options
    });
  }, []);

  const scrollToPosition = useCallback((position, options = {}) => {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
      ...options
    });
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    scrollToBottom,
    scrollToPosition
  };
}; 