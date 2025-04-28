$(window).on('scroll', () => {

    const currentY = this.window.scrollY;
    const headerState = (currentY !== 0)
        ? $('header').addClass('scrolled')
        : $('header').removeClass('scrolled');
    
    $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);

    // const visualState = (currentY >= 650)
    //     ? $('.category').addClass('show')
    //     : $('.category').removeClass('show');

});

const swiper = document.querySelector('.swiper');
const boxes = document.querySelectorAll('.attr_box');

let page = -700;
let total = boxes.length - 1;
let index = 1;

const swipBtns = document.querySelectorAll('.swip_btn button');
const sweep = (boxes) => {
    swipBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains("next")) {
                page -= 700;
                index += 1;
            } else {
                page += 700;
                index -= 1;
            }
            boxes.forEach((item, num) => {
                const currBox = (index === num)
                    ? item.children[0].classList.add("curr_img")
                    : item.children[0].classList.remove("curr_img");
            });
            swiper.style.transform = `translateX(${page}px)`;
        });
    });
};
sweep(boxes);