// attente du chargement complet du dom
document.addEventListener('DOMContentLoaded', () => {
    
    // sélection des boutons de filtre et des cartes d'articles
    const filterbtns = document.querySelectorAll('.filter-btn');
    const blogcards = document.querySelectorAll('.blog-card');

    // boucle sur chaque bouton pour ajouter l'événement de clic
    filterbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // retrait de la classe active sur tous les boutons
            filterbtns.forEach(b => b.classList.remove('active'));
            
            // ajout de la classe active sur le bouton cliqué
            btn.classList.add('active');

            // récupération de la valeur du filtre (web, mobile, design, all)
            const filtervalue = btn.getAttribute('data-filter');

            // filtrage des articles avec une légère animation d'opacité
            blogcards.forEach(card => {
                
                // on cache la carte d'abord pour l'effet de transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    // vérification de la catégorie
                    if (filtervalue === 'all' || card.getAttribute('data-category') === filtervalue) {
                        card.style.display = 'flex';
                        
                        // on force un reflow pour que l'animation css fonctionne
                        void card.offsetWidth;
                        
                        // apparition de la carte
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 200); // délai correspondant à une animation fluide
            });
        });
    });
});