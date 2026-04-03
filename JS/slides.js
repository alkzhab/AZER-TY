function initSlides() {
    const DURATIONS = [3800, 4500, 4200, 0];
    let slides = Array.from(document.querySelectorAll('.slide'));
    const segs = document.querySelectorAll('.progress-seg');
    let current = 0;
    let fillInterval = null;
    let startTime = 0;

    function showSlide(idx) {
        slides.forEach(s => s.classList.remove('active'));
        segs.forEach((s, i) => {
            s.classList.remove('active');
            const fill = s.querySelector('.progress-seg-fill');
            if (i < idx) {
                s.classList.add('done');
                fill.style.width = '100%';
            } else {
                s.classList.remove('done');
                fill.style.width = '0';
            }
        });

        const orig = slides[idx];
        const clone = orig.cloneNode(true);
        clone.classList.add('active');
        orig.parentNode.replaceChild(clone, orig);
        slides[idx] = clone;
        segs[idx].classList.add('active');

        if (DURATIONS[idx] > 0) {
            startTime = performance.now();
            clearInterval(fillInterval);
            fillInterval = setInterval(() => {
                const elapsed = performance.now() - startTime;
                const pct = Math.min(100, (elapsed / DURATIONS[idx]) * 100);
                segs[idx].querySelector('.progress-seg-fill').style.width = `${pct}%`;
                if (pct >= 100) {
                    clearInterval(fillInterval);
                    current = (idx + 1) % slides.length;
                    showSlide(current);
                }
            }, 30);
        } else {
            segs[idx].querySelector('.progress-seg-fill').style.width = '100%';
            segs[idx].classList.remove('active');
            segs[idx].classList.add('done');
        }
    }

    segs.forEach((seg, i) => {
        seg.addEventListener('click', () => {
            clearInterval(fillInterval);
            current = i;
            showSlide(i);
        });
        seg.style.cursor = 'pointer';
    });

    setTimeout(() => showSlide(0), 100);
}

(function () {

    const header = document.querySelector('.approche-header');
    if (header) {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                header.classList.add('ap-visible');
            } else {
                if (e.boundingClientRect.top > 0) {
                    header.classList.remove('ap-visible');
                }
            }
        }, { threshold: 0.3 });
        obs.observe(header);
    }

    document.querySelectorAll('.ap-step-line').forEach(line => {
        if (!line.querySelector('.ap-line-dot')) {
            const dot = document.createElement('span');
            dot.className = 'ap-line-dot';
            line.appendChild(dot);
        }
    });

    document.querySelectorAll('.approche-step').forEach((step, i) => {
        const line = step.querySelector('.ap-step-line');
        let showTimer = null;
        let lineTimer = null;

        const obs = new IntersectionObserver(([e]) => {

            if (e.isIntersecting) {
                const delay = i * 120;

                showTimer = setTimeout(() => {
                    step.classList.add('ap-visible');
                }, delay);

                if (line) {
                    lineTimer = setTimeout(() => {
                        line.classList.add('ap-line-active');
                    }, delay + 300);
                }

            } else {
                if (e.boundingClientRect.top > 0) {
                    clearTimeout(showTimer);
                    clearTimeout(lineTimer);
                    step.classList.remove('ap-visible');
                    if (line) line.classList.remove('ap-line-active');
                }
            }

        }, { threshold: 0.25, rootMargin: '0px 0px -60px 0px' });

        obs.observe(step);
    });

    const c1 = document.querySelector('.ap-circle-1');
    const c2 = document.querySelector('.ap-circle-2');
    if (c1 && c2) {
        window.addEventListener('scroll', () => {
            const section = document.querySelector('.approche-section');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
            c1.style.transform = `translateY(${progress * -60}px) rotate(${progress * 20}deg)`;
            c2.style.transform = `translateY(${progress * 40}px) rotate(${progress * -15}deg)`;
        }, { passive: true });
    }

})();