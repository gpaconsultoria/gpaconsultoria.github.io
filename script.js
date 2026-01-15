// ===== NAVEGACIÓN RESPONSIVE =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menú móvil
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Mostrar/ocultar botón volver arriba
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        if (window.scrollY > 500) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    }
});

// ===== BOTÓN VOLVER ARRIBA =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PREGUNTAS FRECUENTES (FAQ) =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Cerrar otros items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle el item actual
        item.classList.toggle('active');
    });
});

// ===== SCROLL SUAVE PARA ANCLAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMACIÓN AL HACER SCROLL =====
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

// Observar elementos para animación
document.querySelectorAll('.servicio-card, .trayectoria-card, .credencial, .contacto-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Clase para animar elementos
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== FORMULARIO DE CONTACTO (Formspree) =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    // El formulario ahora se envía a Formspree
    // Mostrar mensaje de carga
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Restaurar botón después de envío (Formspree redirige, pero por si acaso)
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// ===== NOTIFICACIÓN =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Añadir animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ===== EFECTO PARALLAX SUAVE EN HERO =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ===== CONTADOR ANIMADO =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observar stats para animar
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const value = statNumber.textContent;
            
            if (value.includes('+')) {
                const num = parseInt(value);
                statNumber.textContent = '0';
                animateCounter(statNumber, num);
                setTimeout(() => {
                    statNumber.textContent = num + '+';
                }, 2100);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== AÑO ACTUAL EN FOOTER =====
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const copyright = document.querySelector('.footer-copyright');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace('2026', year);
    }
});
