// src/hooks/useAOSObserver.js
import { useEffect } from 'react';
import AOS from 'aos';

export const useAOSObserver = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Only refresh if element hasn't been animated yet
                    if (!entry.target.classList.contains('aos-animate')) {
                        AOS.refreshHard(); // Force refresh for this element
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px 100px 0px' // 100px bottom margin
        });

        // Observe all sections with data-aos attribute
        const sections = document.querySelectorAll('[data-aos]');
        sections.forEach(section => {
            observer.observe(section);
        });

        // In useAOSObserver
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => AOS.refresh());
        });

        return () => {
            observer.disconnect();
        };
    }, []);
};