// header
const header = document.querySelector('header');
let currentY = 150;

window.addEventListener('scroll', () => {
    const thisScr = this.window.scrollY;
    if (150 < thisScr && currentY < thisScr) {
        header.classList.add("scrolled");
        header.style.transform = 'translateY(-100%)';
    } else header.style.transform = 'translateY(0)';

    currentY = thisScr;
    if (thisScr === 0) header.classList.remove("scrolled");

    // visual
    const visual = document.querySelector('.main');
    if (thisScr > 120) {
        let radius = thisScr / 10;
        visual.style.borderRadius = radius + "px";
    } else visual.style.borderRadius = 0;
});