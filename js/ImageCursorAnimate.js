document.addEventListener("mousemove", (event) => {
    const image = document.querySelector(".promo__image");
    const speed = 0.03; // Скорость движения (можно настроить)
    
    const moveX = ((window.innerWidth / 2 - event.clientX) * speed) / 2;
    const moveY = ((window.innerHeight / 2 - event.clientY) * speed) / 2;
    
    image.style.cssText = `transform: translate(${moveX}px, ${moveY}px) !important;`;
});