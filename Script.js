/**
 * Kartik Goyal - Portfolio Core Interaction Engine
 * Architecture: Vanilla JS (ES6+) Optimized Client Runtime
 */

// 1. KINETIC CANVAS PARTICLE NETWORK
class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.maxParticles = 65;

        this.init();
    }

    init() {
        // Configure fixed low-level rendering context
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        document.body.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Populate node coordinates
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 1
            });
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Boundary collision detection algorithms
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
            this.ctx.fill();

            // Proximity link lines tracking loop
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }

            // Mouse interactive focal calculations
            if (this.mouse.x !== null) {
                let mdx = p.x - this.mouse.x;
                let mdy = p.y - this.mouse.y;
                let mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < this.mouse.radius) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(109, 40, 217, ${0.18 * (1 - mDist / this.mouse.radius)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
        requestAnimationFrame(() => this.animate());
    }
}

// 2. HIGH-PERFORMANCE ASYNC SCROLL ACTIVE LINK STATE OBSERVER
function initScrollObserver() {
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -50% 0px', // Inspect layout center intersection vectors
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    // Reset styling configurations
                    link.style.borderColor = 'transparent';
                    link.style.color = '#9ca3af';
                    link.style.backgroundColor = 'transparent';

                    // Match active route block link target identification
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.style.borderColor = '#6d28d9';
                        link.style.color = '#06b6d4';
                        link.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

// 3. ASYNC FORM HANDLER PIPELINE TRANSIT
function initFormHandler() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Set immediate locking parameters for ongoing transmissions
        submitBtn.textContent = 'Transmitting Payload...';
        submitBtn.style.opacity = '0.6';
        submitBtn.disabled = true;

        // Collect field array structure maps
        const formData = {
            name: form.querySelector('input[placeholder="Your Name"]').value,
            email: form.querySelector('input[placeholder="Your Email"]').value,
            subject: form.querySelector('input[placeholder="Subject"]').value,
            message: form.querySelector('textarea').value
        };

        try {
            // Async API delay pipeline mock (Integrate direct MERN/fetch targets cleanly here)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Update structural element style properties to handle success verification feedback
            submitBtn.textContent = 'Message Dispatched';
            submitBtn.style.background = 'linear-gradient(90deg, #10b981, #059669)';
            form.reset();

            setTimeout(() => {
                submitBtn.textContent = 'Dispatch Message';
                submitBtn.style.background = 'linear-gradient(90deg, #06b6d4, #6d28d9)';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            submitBtn.textContent = 'Transmission Error';
            submitBtn.style.background = '#ef4444';

            setTimeout(() => {
                submitBtn.textContent = 'Dispatch Message';
                submitBtn.style.background = 'linear-gradient(90deg, #06b6d4, #6d28d9)';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// 4. UNIFIED CORE INITIALIZATION ORCHESTRATION
document.addEventListener('DOMContentLoaded', () => {
    // Fire Canvas Engine
    new ParticleNetwork();

    // Fire High Performance Obducers
    initScrollObserver();

    // Fire Transaction Data Interfaces
    initFormHandler();
});