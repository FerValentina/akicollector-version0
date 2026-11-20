(() => {
    const phrases = [ ...document.querySelectorAll(".hero-type") ];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    function finish() {
        clearTimeout(timer);
        phrases.forEach(el => {
            el.querySelector(".type-text").textContent = el.dataset.phrase;
            el.classList.remove("is-typing");
        });
    }
    function start() {
        finish();
        if (reduced.matches || document.hidden) return;
        const language = document.documentElement.dataset.lang === "en" ? "en" : "es";
        const current = document.querySelector(".hero-h1 > ." + language + " .hero-type");
        if (!current) return;
        const target = current.querySelector(".type-text");
        const letters = Array.from(current.dataset.phrase);
        let position = 0;
        target.textContent = "";
        current.classList.add("is-typing");
        function type() {
            target.textContent = letters.slice(0, ++position).join("");
            if (position < letters.length) timer = setTimeout(type, 155); else timer = setTimeout(() => current.classList.remove("is-typing"), 900);
        }
        timer = setTimeout(type, 650);
    }
    window.addEventListener("akicollector:langchange", start);
    reduced.addEventListener("change", () => reduced.matches ? finish() : start());
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) finish();
    });
    start();
})();
