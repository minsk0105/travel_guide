// 헤더
const header = document.querySelector("header");
let currentY = window.scrollY;

window.addEventListener('scroll', () => {
    if (currentY < this.window.scrollY) {
        header.style.transform = 'translateY(-100%)';
        header.classList.add("scrolling");
        currentY = this.window.scrollY;
    } else {
        header.style.transform = 'translateY(0)';
        currentY = this.window.scrollY;
    }
    if (this.window.scrollY === 0) {
        header.classList.remove("scrolling");
    }
});