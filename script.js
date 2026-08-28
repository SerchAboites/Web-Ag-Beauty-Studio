document.addEventListener("DOMContentLoaded", () => {

    // --- CÓDIGO DEL MENÚ ---
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const drawerMenu = document.getElementById("drawer-menu");
    const overlay = document.getElementById("overlay");
    const navLinks = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        drawerMenu.classList.toggle("open");
        overlay.classList.toggle("active");
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



    // --- LÓGICA PARA MOSTRAR/OCULTAR EL BOTÓN CIRCULAR ---
    const heroSection = document.getElementById("inicio");
    const floatingBtn = document.getElementById("btn-flotante-circular");

    if (heroSection && floatingBtn) {
        // Creamos al "vigilante"
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // isIntersecting es true si la sección 'inicio' se ve en pantalla
                if (!entry.isIntersecting) {
                    // Si ya NO se ve el hero, agregamos la clase para mostrar el botón
                    floatingBtn.classList.add("show-btn");
                } else {
                    // Si el hero sí se ve, quitamos la clase para ocultar el botón
                    floatingBtn.classList.remove("show-btn");
                }
            });
        }, {
            // threshold: 0.1 significa que reaccionará cuando quede menos del 10% del hero visible
            threshold: 0.1
        });

        // Le decimos al vigilante que observe la sección del hero
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

});