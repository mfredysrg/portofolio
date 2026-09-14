// Set dynamic year for footer
document.getElementById('copyright').innerHTML = `© ${new Date().getFullYear()} M Fredyansyah Siregar. All rights reserved.`;

// Canvas Stars Background
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let width, height, stars = [];
const numStars = 200;

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.1,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25,
            glow: Math.random() > 0.9,
            twinkleSpeed: Math.random() * 0.05 + 0.01,
            opacity: Math.random()
        });
    }
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        
        if (s.glow) {
            ctx.shadowBlur = Math.random() * 10 + 5;
            ctx.shadowColor = '#2c67ed';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();

        s.x += s.vx / 100;
        s.y += s.vy / 100;
        
        s.opacity += s.twinkleSpeed;
        if(s.opacity > 1 || s.opacity < 0.1) {
            s.twinkleSpeed = -s.twinkleSpeed;
        }

        if (s.x < 0 || s.x > width) s.vx = -s.vx;
        if (s.y < 0 || s.y > height) s.vy = -s.vy;
    }
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();

// Typing Text Effect
const texts = ['Junior Developer', 'Tech Enthusiast', 'Information Systems Student'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typed-text');

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
}
setTimeout(typeEffect, 500);

// Navbar Scroll effect & Scroll Spy
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Navbar padding shrink
    if (window.scrollY > 50) {
        navbar.classList.remove('py-4');
        navbar.classList.add('py-3');
    } else {
        navbar.classList.remove('py-3');
        navbar.classList.add('py-4');
    }

    // Scroll Spy
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const navBg = link.querySelector('.nav-bg');
        
        link.classList.remove('text-white');
        link.classList.add('text-slate-400');
        navBg.classList.add('hidden');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-white');
            link.classList.remove('text-slate-400');
            navBg.classList.remove('hidden');
        }
    });
});

// Portfolio Tabs logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active styling from all buttons
        tabBtns.forEach(b => {
            b.classList.remove('bg-primary', 'text-white', 'shadow-[0_0_15px_rgba(44,103,237,0.4)]');
            b.classList.add('bg-slate-800', 'text-slate-400');
        });
        
        // Add active styling to clicked button
        btn.classList.add('bg-primary', 'text-white', 'shadow-[0_0_15px_rgba(44,103,237,0.4)]');
        btn.classList.remove('bg-slate-800', 'text-slate-400');

        // Hide all contents and show target
        const targetId = btn.getAttribute('data-target');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetId) {
                content.classList.add('active');
            }
        });
    });
});

// Scroll Animations (Intersection Observer instead of Framer Motion)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // run once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
    observer.observe(el);
});