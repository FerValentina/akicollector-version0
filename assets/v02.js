(() => {
    const tools = document.querySelector(".scroll-tools");
    if (!tools) return;
    const up = tools.querySelector('[data-scroll="up"]');
    const down = tools.querySelector('[data-scroll="down"]');
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    function updatePosition() {
        const bottom = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        up.disabled = scrollY <= 2;
        down.disabled = scrollY >= bottom - 2;
    }
    function updateLabels() {
        const english = document.documentElement.dataset.lang === "en";
        tools.setAttribute("aria-label", english ? "Quick page navigation" : "Desplazamiento rápido");
        for (const [button, es, en] of [ [ up, "Volver arriba", "Back to top" ], [ down, "Ir al final", "Go to bottom" ] ]) {
            button.title = english ? en : es;
            button.setAttribute("aria-label", english ? en : es);
        }
    }
    for (const button of [ up, down ]) {
        button.addEventListener("click", () => {
            window.scrollTo({
                top: button === up ? 0 : Math.max(0, document.documentElement.scrollHeight - innerHeight),
                behavior: reducedMotion.matches ? "instant" : "smooth"
            });
        });
    }
    window.addEventListener("scroll", updatePosition, {
        passive: true
    });
    window.addEventListener("resize", updatePosition);
    window.addEventListener("akicollector:langchange", updateLabels);
    new ResizeObserver(updatePosition).observe(document.body);
    updateLabels();
    updatePosition();
    tools.hidden = false;
})();
