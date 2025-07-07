document.addEventListener('DOMContentLoaded', function() {

    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');

    const toggleMenu = () => {
        const isActive = menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    };

    menu.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

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
