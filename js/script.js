// Initialize Icons
if (window.lucide) {
    lucide.createIcons();
}

// Background Animation (Interactive Neural Network)
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let points = [];
const numPoints = 80;
let mouse = { x: null, y: null, radius: 180 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    points = [];
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
        });
    }
}

function getThemeColors() {
    const isLightMode = !document.documentElement.classList.contains('dark');
    return {
        particle: isLightMode ? '#0891b2' : '#06b6d4', // Cyan
        line: isLightMode ? 'rgba(8, 145, 178, 0.2)' : 'rgba(6, 182, 212, 0.25)'
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colors = getThemeColors();
    ctx.fillStyle = colors.particle;
    
    points.forEach((p, i) => {
        // Move points
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Neural network mouse interaction (repulsion/attraction)
        if (mouse.x != null) {
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let distance = Math.hypot(dx, dy);
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = (dx / distance) * force * 5;
                const directionY = (dy / distance) * force * 5;
                p.x -= directionX;
                p.y -= directionY;
            }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 180) {
                ctx.strokeStyle = colors.line;
                ctx.lineWidth = 1 - dist/180;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(draw);
}

window.addEventListener('resize', initCanvas);
initCanvas();
draw();

// GSAP Animations (Scroll Reveal)
window.onload = () => {
    // Hero Elements Reveal
    gsap.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Glass cards scroll reveal
    gsap.utils.toArray('.glass-card:not(nav)').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Section Titles scroll reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // Dynamic Metric Counters
    const counters = document.querySelectorAll('.metric-counter');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const counterObj = { val: 0 };
        
        gsap.to(counterObj, {
            scrollTrigger: {
                trigger: counter,
                start: "top 90%", // Trigger slightly before fully into view
                toggleActions: "play none none none" // Play only once per page load
            },
            val: target,
            duration: 2.5, // 2.5 second nice smooth animation
            ease: "power3.out", // Smooth deceleration
            onUpdate: function() {
                counter.innerHTML = Math.round(counterObj.val) + suffix;
            }
        });
    });
};

// Theme Toggle capability
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        
        // Update the Icon
        const iconElement = themeBtn.querySelector('i');
        if (isDark) {
            iconElement.setAttribute('data-lucide', 'sun');
            iconElement.classList.replace('text-slate-800', 'text-yellow-400');
        } else {
            iconElement.setAttribute('data-lucide', 'moon');
            iconElement.classList.replace('text-yellow-400', 'text-slate-800');
        }
        lucide.createIcons();
    });
}




    document.addEventListener('DOMContentLoaded', () => {

        const mobileMenuToggle =
            document.getElementById('mobile-menu-toggle');

        const mobileMenu =
            document.getElementById('mobile-menu');

        if (!mobileMenuToggle || !mobileMenu) {
            return;
        }

        mobileMenuToggle.addEventListener('click', () => {

            const isOpen =
                mobileMenu.classList.contains('is-open');

            mobileMenu.classList.toggle(
                'is-open',
                !isOpen
            );

            mobileMenuToggle.setAttribute(
                'aria-expanded',
                String(!isOpen)
            );

            mobileMenuToggle.setAttribute(
                'aria-label',
                isOpen
                    ? 'Open navigation menu'
                    : 'Close navigation menu'
            );

        });

    });




    
      document.addEventListener('DOMContentLoaded', () => {

        const profileButton =
            document.getElementById('hero-profile-button');

        if (!profileButton) {
            return;
        }

        profileButton.addEventListener('click', () => {

            const isActive =
                profileButton.classList.toggle('is-active');

            profileButton.setAttribute(
                'aria-pressed',
                String(isActive)
            );

        });

    });







     document.addEventListener('DOMContentLoaded', () => {

        const showMoreProjectsBtn =
            document.getElementById('show-more-projects');

        const extraProjects =
            document.querySelectorAll('[data-project-extra]');

        if (!showMoreProjectsBtn || extraProjects.length === 0) {
            return;
        }

        showMoreProjectsBtn.addEventListener('click', () => {

            const isHidden =
                extraProjects[0].classList.contains('hidden');

            extraProjects.forEach(project => {
                project.classList.toggle('hidden', !isHidden);
            });

            const buttonText =
                showMoreProjectsBtn.querySelector('span');

            if (buttonText) {
                buttonText.textContent =
                    isHidden
                        ? 'SHOW LESS PROJECTS'
                        : 'SHOW MORE PROJECTS';
            }

            const icon =
                showMoreProjectsBtn.querySelector('[data-lucide]');

            if (icon) {
                icon.setAttribute(
                    'data-lucide',
                    isHidden ? 'chevron-up' : 'chevron-down'
                );

                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });

    });
window.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});