// src/hooks/useAOSObserver.js
import { useEffect } from 'react';
import AOS from 'aos';

export const useAOSObserver = () => {
    useEffect(() => {
        const collectTargets = () => Array.from(document.querySelectorAll('[data-aos]'));

        const ensureInitClass = (el) => {
            if (!el.classList.contains('aos-init')) el.classList.add('aos-init');
        };

        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                const el = entry.target;
                const onceAttr = el.getAttribute('data-aos-once');
                const once = onceAttr === 'true';

                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    ensureInitClass(el);
                    el.classList.add('aos-animate');
                    if (once) obs.unobserve(el);
                } else if (entry.intersectionRatio === 0) {
                    if (!once) el.classList.remove('aos-animate');
                }
            });
        }, {
            root: null,
            threshold: [0, 0.01, 0.1, 0.25],
            rootMargin: '0px 0px 120px 0px',
        });

        const prime = () => {
            const targets = collectTargets();
            targets.forEach((t) => {
                ensureInitClass(t);
                io.observe(t);
            });
        };

        prime();

        // Refresh AOS on image load and resize to account for layout shifts
        const onImgLoad = () => AOS.refresh();
        const images = document.querySelectorAll('img');
        images.forEach((img) => img.addEventListener('load', onImgLoad, { passive: true }));

        const onResize = () => AOS.refresh();
        window.addEventListener('resize', onResize, { passive: true });

        // Observe DOM mutations to handle dynamically added [data-aos] elements
        const mo = new MutationObserver((mutations) => {
            let needsPrime = false;
            mutations.forEach((m) => {
                if (m.type === 'childList') {
                    m.addedNodes.forEach((node) => {
                        if (!(node instanceof HTMLElement)) return;
                        if (node.matches && node.matches('[data-aos]')) needsPrime = true;
                        if (node.querySelector && node.querySelector('[data-aos]')) needsPrime = true;
                    });
                }
                if (m.type === 'attributes' && m.attributeName === 'data-aos') {
                    needsPrime = true;
                }
            });
            if (needsPrime) {
                prime();
                AOS.refreshHard();
            }
        });

        mo.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['data-aos'],
        });

        return () => {
            io.disconnect();
            mo.disconnect();
            window.removeEventListener('resize', onResize);
            images.forEach((img) => img.removeEventListener('load', onImgLoad));
        };
    }, []);
};