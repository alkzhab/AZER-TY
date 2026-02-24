function toggleContext() {
        const extra   = document.getElementById('ctx-extra');
        const btn     = document.getElementById('ctx-toggle');
        const label   = document.getElementById('ctx-toggle-label');

        const isOpen = extra.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        label.textContent = isOpen ? 'Voir moins' : 'Voir plus';
    }

    const meters = document.querySelectorAll('.proj-meter-fill');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.3 });

    meters.forEach(m => {
        m.style.animationPlayState = 'paused';
        observer.observe(m);
    });