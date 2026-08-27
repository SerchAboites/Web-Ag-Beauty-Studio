document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const drawerMenu = document.getElementById("drawer-menu");
    const overlay = document.getElementById("overlay");
    const navLinks = document.querySelectorAll(".nav-link");

    // Función para abrir/cerrar menú
    const toggleMenu = () => {
        drawerMenu.classList.toggle("open");
        overlay.classList.toggle("active");
    };

    hamburgerBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    // Cerrar el menú al dar clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (drawerMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    });
});