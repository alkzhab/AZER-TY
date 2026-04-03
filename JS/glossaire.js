const cards     = document.querySelectorAll('.gloss-card');
const categories= document.querySelectorAll('.gloss-category');
const searchInput = document.getElementById('gloss-search');
const countEl   = document.getElementById('gloss-count');
const noResult  = document.getElementById('gloss-no-result');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const wasOpen = card.classList.contains('open');
        cards.forEach(c => c.classList.remove('open'));
        if (!wasOpen) card.classList.add('open');
    });
});

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const usedLetters = new Set();
cards.forEach(c => {
    const letter = c.dataset.term[0].toUpperCase();
    usedLetters.add(letter);
});

const alphaNav = document.getElementById('alpha-nav');
alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.textContent = letter;
    if (!usedLetters.has(letter)) btn.disabled = true;
    btn.addEventListener('click', () => {
        filterByLetter(letter, btn);
    });
    alphaNav.appendChild(btn);
});

function filterByLetter(letter, activeBtn) {
    const isActive = activeBtn.classList.contains('active');
    document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
    searchInput.value = '';

    if (isActive) {
        showAll();
        return;
    }

    activeBtn.classList.add('active');
    let visibleCount = 0;
    cards.forEach(card => {
        const match = card.dataset.term[0].toUpperCase() === letter;
        card.classList.toggle('hidden', !match);
        if (match) visibleCount++;
    });

    categories.forEach(cat => {
        const hasVisible = [...cat.querySelectorAll('.gloss-card:not(.hidden)')].length > 0;
        cat.classList.toggle('hidden', !hasVisible);
    });

    updateCount(visibleCount);
    noResult.style.display = visibleCount === 0 ? 'block' : 'none';
}

searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));

    if (!q) { showAll(); return; }

    let visibleCount = 0;
    cards.forEach(card => {
        const term = card.dataset.term.toLowerCase();
        const body = card.querySelector('.gloss-card-body')?.textContent.toLowerCase() || '';
        const match = term.includes(q) || body.includes(q);
        card.classList.toggle('hidden', !match);
        if (match) {
            visibleCount++;
            card.classList.add('open');
        } else {
            card.classList.remove('open');
        }
    });

    categories.forEach(cat => {
        const hasVisible = [...cat.querySelectorAll('.gloss-card:not(.hidden)')].length > 0;
        cat.classList.toggle('hidden', !hasVisible);
    });

    updateCount(visibleCount);
    noResult.style.display = visibleCount === 0 ? 'block' : 'none';
});

function showAll() {
    cards.forEach(c => { c.classList.remove('hidden'); c.classList.remove('open'); });
    categories.forEach(c => c.classList.remove('hidden'));
    countEl.textContent = '';
    noResult.style.display = 'none';
}

function updateCount(n) {
    countEl.textContent = n === 0 ? '' : `${n} terme${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}`;
}