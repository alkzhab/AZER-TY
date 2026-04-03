const header = document.getElementById('site-header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

const THRESHOLD = 60;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
    requestAnimationFrame(() => {
        if (window.scrollY > THRESHOLD) {
        header.classList.add('scrolled');
        } else {
        header.classList.remove('scrolled');
        }
        ticking = false;
    });
    ticking = true;
    }
});

burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    mobileMenu.classList.toggle('open', open);
});

mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
    mobileMenu.classList.remove('open');
    });
});

const links = document.querySelectorAll('.nav-list a');
links.forEach(a => {
    if (a.href === location.href) a.classList.add('active');
});