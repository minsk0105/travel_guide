const boxes = document.querySelectorAll('.con_box');

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        const currentY = this.window.scrollY;
        let order = Math.floor(currentY / 320);
        let size;

        if (currentY >= 320) {
            size = ((currentY - (320 * order)) / 5) / 10;
        } else size = (currentY / 5) / 10;

        console.log(size);

        if (currentY > 0) {
            boxes[order].style.clipPath = `polygon(0% 0%, 100% 0%, ${100 - size}% 100%, ${size}% 100%)`;
        }
        
    });

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.top = `calc(10rem + ${i * 40}px)`;
    }

});