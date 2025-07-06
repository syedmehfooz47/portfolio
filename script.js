document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 1s ${entry.target.dataset.delay}`;
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    });

    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.dataset.delay = `${index * 150}ms`;
        observer.observe(card);
    });
});

const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);
