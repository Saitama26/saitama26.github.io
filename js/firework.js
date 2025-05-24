document.addEventListener("click", pop);

function pop(e) {
    for (let i = 0; i < 15; i++) {
        createParticle(e.pageX, e.pageY);
    }
}

function createParticle(x, y) {
    const particle = document.createElement("div");


    const size = Math.floor(Math.random() * 20 + 5);

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `hsl(${Math.random() * 80 + 40}, 70%, 60%)`;
    particle.style.position = "absolute";
    particle.style.borderRadius = "50%";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.transform = "translate(-50%, -50%)"; // Центрируем эффект
    particle.style.zIndex = "9999";

    const destinationX = x + ((Math.random() - 0.5) * 2 * 75);
    const destinationY = y + ((Math.random() - 0.5) * 2 * 75);

    document.body.appendChild(particle);

    const animation = particle.animate([
        {
            transform: `translate(0, 0)`,
            opacity: 1
        },
        {
            transform: `translate(${destinationX - x}px, ${destinationY - y}px)`,
            opacity: 0
        }
    ], {
        duration: 500 + Math.random() * 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay: Math.random() * 200
    });

    animation.onfinish = () => {
        particle.remove();
    };
}
