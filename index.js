document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("valentineOverlay");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    /* ===== KEZDŐ POZÍCIÓ: IGEN MELLETT ===== */
    function placeNoNextToYes() {
        const yesRect = yesBtn.getBoundingClientRect();

        noBtn.style.left = yesRect.right + 16 + "px";
        noBtn.style.top = yesRect.top + "px";
    }

    placeNoNextToYes();

    /* ===== NEM GOMB MENEKÜLÉS ===== */
    function moveNoRandom() {
        const padding = 20;

        const x =
            Math.random() *
                (window.innerWidth - noBtn.offsetWidth - padding * 2) +
            padding;

        const y =
            Math.random() *
                (window.innerHeight - noBtn.offsetHeight - padding * 2) +
            padding;

        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    document.addEventListener("mousemove", (e) => {
        const rect = noBtn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        const distance = Math.hypot(
            e.clientX - btnX,
            e.clientY - btnY
        );

        if (distance < 90) {
            moveNoRandom();
        }
    });

    document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        if (!touch) return;

        const rect = noBtn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        const distance = Math.hypot(
            touch.clientX - btnX,
            touch.clientY - btnY
        );

        if (distance < 100) {
            moveNoRandom();
        }
    });

    /* ===== IGEN GOMB ===== */
    yesBtn.addEventListener("click", () => {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";

        startHeartRain();

        setTimeout(() => {
            overlay.remove();
            document.body.classList.remove("locked");
        }, 450);
    });

    /* ===== SZÍVECSKE ESŐ ===== */
    function startHeartRain() {
        const duration = 3000;
        const interval = setInterval(createHeart, 120);
        setTimeout(() => clearInterval(interval), duration);
    }

    function createHeart() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = "💗";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = 16 + Math.random() * 14 + "px";
        heart.style.animationDuration = 2 + Math.random() * 2 + "s";

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
});
