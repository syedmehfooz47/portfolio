document.addEventListener('DOMContentLoaded', function() {

    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const cursorGlow = document.getElementById('cursor-glow');

    // --- Interactive Cursor Glow ---
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // --- Mobile Menu Toggle ---
    const toggleMenu = () => {
        const isActive = menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    };

    menu.addEventListener('click', toggleMenu);

    // --- Close mobile menu on link click ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- On-Scroll Reveal Animation (REPEATING) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
            else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const navHighlighter = () => {
        let scrollY = window.pageYOffset;
        let activeSectionId = null;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                activeSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + activeSectionId) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', navHighlighter, { passive: true });

});
