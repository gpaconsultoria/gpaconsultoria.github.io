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

// ===== ESTIMADOR DE HONORARIOS =====
const tipoServicio = document.getElementById('tipoServicio');
const grupoArea = document.getElementById('grupoArea');
const grupoTipo = document.getElementById('grupoTipo');
const grupoVisitas = document.getElementById('grupoVisitas');
const calcularBtn = document.getElementById('calcularBtn');
const resultadoEstimador = document.getElementById('resultadoEstimador');

// Configuración de precios (rangos en COP)
const preciosBase = {
    visita: {
        nombre: 'Visita Técnica Simple',
        min: 150000,
        max: 250000,
        descripcion: 'Inspección inicial en sitio con recomendaciones verbales.',
        requiereArea: false,
        requiereTipo: false,
        requiereVisitas: false
    },
    patologias: {
        nombre: 'Informe de Patologías',
        min: 800000,
        max: 1500000,
        descripcion: 'Diagnóstico completo con registro fotográfico, análisis de causas y recomendaciones técnicas.',
        requiereArea: true,
        requiereTipo: true,
        requiereVisitas: false,
        factorArea: { pequeño: 1, mediano: 1.3, grande: 1.6 }
    },
    interventoria: {
        nombre: 'Interventoría de Obras',
        min: 200000,
        max: 300000,
        descripcion: 'Supervisión y control de calidad por visita.',
        requiereArea: false,
        requiereTipo: true,
        requiereVisitas: true,
        porVisita: true
    },
    diseno: {
        nombre: 'Diseño Estructural',
        min: 25000,
        max: 40000,
        descripcion: 'Cálculo estructural según NSR-10.',
        requiereArea: true,
        requiereTipo: true,
        requiereVisitas: false,
        porM2: true,
        factorTipo: { residencial: 1, comercial: 1.2, ph: 1.3, industrial: 1.4 }
    },
    supervision: {
        nombre: 'Supervisión Técnica Itinerante',
        min: 180000,
        max: 250000,
        descripcion: 'Visitas de control periódicas a su obra.',
        requiereArea: false,
        requiereTipo: false,
        requiereVisitas: true,
        porVisita: true
    },
    peritaje: {
        nombre: 'Peritaje Técnico',
        min: 600000,
        max: 1200000,
        descripcion: 'Concepto técnico profesional para toma de decisiones.',
        requiereArea: true,
        requiereTipo: true,
        requiereVisitas: false,
        factorArea: { pequeño: 1, mediano: 1.25, grande: 1.5 }
    }
};

// Mostrar/ocultar campos según servicio seleccionado
if (tipoServicio) {
    tipoServicio.addEventListener('change', () => {
        const servicio = preciosBase[tipoServicio.value];
        
        if (servicio) {
            grupoArea.style.display = servicio.requiereArea ? 'block' : 'none';
            grupoTipo.style.display = servicio.requiereTipo ? 'block' : 'none';
            grupoVisitas.style.display = servicio.requiereVisitas ? 'block' : 'none';
        } else {
            grupoArea.style.display = 'none';
            grupoTipo.style.display = 'none';
            grupoVisitas.style.display = 'none';
        }
        
        // Reset resultado
        resultadoEstimador.innerHTML = `
            <div class="resultado-placeholder">
                <i class="fas fa-hand-pointer"></i>
                <p>Complete los datos y presione calcular</p>
            </div>
        `;
    });
}

// Función para formatear moneda
function formatearPrecio(valor) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
}

// Calcular estimado
if (calcularBtn) {
    calcularBtn.addEventListener('click', () => {
        const servicioKey = tipoServicio.value;
        
        if (!servicioKey) {
            resultadoEstimador.innerHTML = `
                <div class="resultado-placeholder">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Por favor seleccione un tipo de servicio</p>
                </div>
            `;
            return;
        }
        
        const servicio = preciosBase[servicioKey];
        const area = parseFloat(document.getElementById('areaProyecto').value) || 0;
        const tipoEdif = document.getElementById('tipoEdificacion').value;
        const visitas = parseInt(document.getElementById('numVisitas').value) || 1;
        
        let precioMin = servicio.min;
        let precioMax = servicio.max;
        let notaAdicional = '';
        
        // Calcular según tipo de servicio
        if (servicio.porM2 && area > 0) {
            precioMin = servicio.min * area;
            precioMax = servicio.max * area;
            
            if (servicio.factorTipo && tipoEdif) {
                const factor = servicio.factorTipo[tipoEdif] || 1;
                precioMin *= factor;
                precioMax *= factor;
            }
            notaAdicional = `Calculado para ${area} m²`;
        } else if (servicio.porVisita && visitas > 0) {
            precioMin = servicio.min * visitas;
            precioMax = servicio.max * visitas;
            notaAdicional = `Estimado para ${visitas} visita(s)`;
        } else if (servicio.factorArea && area > 0) {
            let factorArea = 'pequeño';
            if (area > 150) factorArea = 'grande';
            else if (area > 80) factorArea = 'mediano';
            
            const factor = servicio.factorArea[factorArea];
            precioMin *= factor;
            precioMax *= factor;
            notaAdicional = `Ajustado para inmueble de ${area} m²`;
        }
        
        // Mostrar resultado
        resultadoEstimador.innerHTML = `
            <div class="resultado-contenido">
                <p class="resultado-titulo">Estimación para</p>
                <p class="resultado-servicio">${servicio.nombre}</p>
                <div class="resultado-rango">
                    <p class="resultado-rango-label">Rango estimado:</p>
                    <p class="resultado-precio">${formatearPrecio(precioMin)} - ${formatearPrecio(precioMax)}</p>
                </div>
                <p class="resultado-nota">
                    <i class="fas fa-info-circle"></i> ${servicio.descripcion}
                    ${notaAdicional ? '<br><strong>' + notaAdicional + '</strong>' : ''}
                </p>
                <a href="#contacto" class="btn-cotizar">
                    <i class="fab fa-whatsapp"></i> Solicitar Cotización Exacta
                </a>
            </div>
        `;
    });
}

// ===== AÑO ACTUAL EN FOOTER =====
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const copyright = document.querySelector('.footer-copyright');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace('2026', year);
    }
});
