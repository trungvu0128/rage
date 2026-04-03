document.addEventListener('DOMContentLoaded', () => {
    initFireParticles();
    initSmokeEffect();
    initRageMeter();
    initCopyButton();
    initScrollAnimations();
});

function initFireParticles() {
    const fireContainer = document.getElementById('fire-container');
    
    const particleCount = 25;
    const fireEmojis = ['🔥', '💥', '🌋', '⚡', '💢'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createFireEmoji(fireContainer, fireEmojis), i * 150);
    }
}

function createFireEmoji(container, emojis) {
    const particle = document.createElement('div');
    particle.className = 'fire-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    const size = Math.random() * 1.5 + 1;
    particle.style.fontSize = (size * 20) + 'px';
    
    const left = Math.random() * 100;
    particle.style.left = left + '%';
    
    const duration = Math.random() * 4 + 3;
    particle.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 2;
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
    
    particle.addEventListener('animationiteration', () => {
        particle.style.left = (Math.random() * 100) + '%';
    });
}

function initSmokeEffect() {
    const smokeOverlay = document.getElementById('smoke-overlay');
    let offset = 0;
    
    setInterval(() => {
        offset += 0.5;
        const x = Math.sin(offset * 0.01) * 20;
        const y = Math.cos(offset * 0.015) * 15;
        const scale = 1 + Math.sin(offset * 0.02) * 0.1;
        
        smokeOverlay.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }, 50);
}

function initRageMeter() {
    const gaugeArc = document.getElementById('gaugeArc');
    const gaugeText = document.getElementById('gaugeText');
    
    const targetPercentage = 98;
    let currentPercentage = 0;
    const maxDash = 377;
    
    const animateMeter = () => {
        if (currentPercentage < targetPercentage) {
            currentPercentage += 1;
            const dashValue = (currentPercentage / 100) * maxDash;
            gaugeArc.style.strokeDasharray = `${dashValue} ${maxDash}`;
            gaugeText.textContent = currentPercentage + '%';
            requestAnimationFrame(animateMeter);
        }
    };
    
    setTimeout(animateMeter, 500);
}

function initCopyButton() {
    window.copyAddress = function() {
        const address = document.getElementById('contractAddress').textContent;
        
        navigator.clipboard.writeText(address).then(() => {
            const btn = document.querySelector('.btn-copy');
            const originalText = btn.textContent;
            btn.textContent = '✓ COPIED!';
            btn.style.background = '#00FF00';
            btn.style.color = '#000';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            const textArea = document.createElement('textarea');
            textArea.value = address;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const btn = document.querySelector('.btn-copy');
            btn.textContent = '✓ COPIED!';
            setTimeout(() => {
                btn.textContent = '📋 COPY';
            }, 2000);
        });
    };
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.token-card, .step, .meter-container, .contract-box');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

document.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
