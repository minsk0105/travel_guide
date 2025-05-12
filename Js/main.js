window.addEventListener('DOMContentLoaded', () => {
    // $('body').css('overflow', 'hidden');
    // setTimeout(() => {
    //     $('body').css('overflow', 'auto');
    // }, 4500);

    window.addEventListener('scroll', () => {
        const currentY = this.window.scrollY;
        const headerState = (currentY !== 0)
            ? $('header').addClass('scrolled')
            : $('header').removeClass('scrolled');

        $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);
    });
});

let getJson;
fetch("Js/place.json")
.then((res) => {
    return res.json();
})
.then(data => {
    getJson = data;
});

const swiper = document.querySelector('.swiper');
const boxes = document.querySelectorAll('.attr_box');
swiper.style.width = `calc(70rem * ${boxes.length})`;