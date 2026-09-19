document.addEventListener("DOMContentLoaded", () => {

    // --- CÓDIGO DEL MENÚ ---
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const drawerMenu = document.getElementById("drawer-menu");
    const overlay = document.getElementById("overlay");
    const navLinks = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        drawerMenu.classList.toggle("open");
        overlay.classList.toggle("active");
        hamburgerBtn.classList.toggle("open");
    };

    hamburgerBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (drawerMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    });

    // --- CÓDIGO DE LAS PARTÍCULAS (POLVO DORADO) ---
    const createParticles = () => {
        const container = document.getElementById('particles-container');

        if (!container) return;

        const particleCount = 25;

        for (let i = 0; i < particleCount; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');

            let size = Math.random() * 8 + 4;
            let leftPos = Math.random() * 100;
            let animDuration = Math.random() * 10 + 10;
            let delay = Math.random() * 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${leftPos}%`;
            particle.style.animationDuration = `${animDuration}s`;
            particle.style.animationDelay = `${delay}s`;

            container.appendChild(particle);
        }
    };

    createParticles();



    // --- LÓGICA PARA MOSTRAR/OCULTAR EL BOTÓN CIRCULAR Y EL LOGO ---
    // --- CONTROL DE APARICIÓN DE AMBAS BURBUJAS FLOTANTES ---
    const heroSection = document.getElementById("inicio");
    const agendaBtn = document.getElementById("btn-flotante-circular");
    const whatsappBtn = document.getElementById("btn-flotante-whatsapp");
    const headerLogo = document.querySelector(".header .logo");
    const headerElement = document.querySelector(".header");

    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    if (agendaBtn) agendaBtn.classList.add("show-btn");
                    if (whatsappBtn) whatsappBtn.classList.add("show-btn");
                    if (headerLogo) headerLogo.classList.add("show-logo");
                    if (headerElement) headerElement.classList.add("header-scrolled");
                } else {
                    if (agendaBtn) agendaBtn.classList.remove("show-btn");
                    if (whatsappBtn) whatsappBtn.classList.remove("show-btn");
                    if (headerLogo) headerLogo.classList.remove("show-logo");
                    if (headerElement) headerElement.classList.remove("header-scrolled");
                }
            });
        }, {
            threshold: 0.15
        });

        observer.observe(heroSection);
    }


    // --- MAPA LEAFLET ESTÉTICO BLANCO Y GRIS (MÁS CERCA) ---
    const mapContainer = document.getElementById('map');

    if (mapContainer) {
        const lat = 19.527243;
        const lng = -99.221119;

        // Aumentamos el zoom a 18 para acercar las calles al máximo
        const map = L.map('map', {
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            touchZoom: false
        }).setView([lat, lng], 18);

        // Capa de OpenStreetMap (Libre, detallada y permite mucho zoom)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        // Marcador circular dorado
        L.circleMarker([lat, lng], {
            color: '#C29B62',
            fillColor: '#C29B62',
            fillOpacity: 0.8,
            radius: 8,
            weight: 2
        }).addTo(map);
    }

    // --- MANEJO DINÁMICO DE PREGUNTAS FRECUENTES EN MODO ESCRITORIO ---
    const faqItems = document.querySelectorAll(".faq-item");
    const faqPanel = document.getElementById("faq-panel-content");

    if (faqItems.length > 0 && faqPanel) {
        faqItems.forEach((item, index) => {
            if (index === 0) item.classList.add("active-item");

            item.addEventListener("click", (e) => {
                if (window.innerWidth >= 768) {
                    e.preventDefault(); // Evita el colapso nativo en PC
                    faqItems.forEach(i => {
                        i.classList.remove("active-item");
                        i.removeAttribute("open");
                    });
                    item.classList.add("active-item");
                    item.setAttribute("open", "true");

                    const answerText = item.querySelector(".faq-answer p").textContent;
                    faqPanel.innerHTML = `<p>${answerText}</p>`;
                }
            });
        });
    }

    // --- ACTUALIZACIÓN DE TAMAÑO DE MAPA LEAFLET ---
    if (mapContainer && typeof map !== "undefined") {
        setTimeout(() => {
            map.invalidateSize();
        }, 400);
    }

});