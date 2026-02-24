// ── Flip cards — clic pour retourner ──────────────
document.querySelectorAll('.tech-flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    // Accessibilité : Entrée/Espace au clavier
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('flipped');
        }
    });
});