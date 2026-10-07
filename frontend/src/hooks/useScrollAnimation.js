import { useEffect } from 'react';

export const useScrollAnimation = (dependencies = []) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05, // trigger when 5% of the element is visible
      rootMargin: '0px 0px -30px 0px'
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-fade-in-left, .scroll-fade-in-right, .scroll-scale-in'
    );

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, dependencies);
};

export default useScrollAnimation;
