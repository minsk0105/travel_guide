window.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', () => {
        const currentY = this.window.scrollY;
        const headerState = (currentY !== 0)
            ? $('header').addClass('scrolled')
            : $('header').removeClass('scrolled');
        
        $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);
    });

});

const swiper = document.querySelector('.swiper');
const boxes = document.querySelectorAll('.attr_box');
const btns = document.querySelectorAll('.swip_btn button');

let page = -1400;
let index = 2;

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('next')) {
            page -= 700;
            index += 1;
        } else {
            page += 700;
            index -= 1;
        }

        if (page === -700 || page === -4200) {
            setTimeout(() => {
                swiper.style.transition = '0s';
                if (page === -700) {
                    index = 5;
                    page = -3500;
                    swiper.style.transform = 'translateX(-3500px)';
                } else {
                    index = 2;
                    page = -1400;
                    swiper.style.transform = 'translateX(-1400px)';
                }
                swiping(index);
            }, 600);
        }

        swiping(index);

        btns.forEach((btn) => {
            btn.style.pointerEvents = 'none';
            setTimeout(() => {
                btn.style.pointerEvents = 'auto';
            }, 600);
        });

        boxes.forEach(box => box.style.transition = '.5s ease-in-out');
        swiper.style.transition = '.6s ease-in-out';
        swiper.style.transform = `translateX(${page}px)`;
    });
});

function swiping(index) {
    const prevRange = index - 1;
    const nextRange = index + 2;

    boxes.forEach((box, num) => {
        if (index === 2 || index === 5) box.style.transition = '0s';
        const isRange = (num < prevRange || num > nextRange)
            ? box.classList.add('out_range')
            : box.classList.remove('out_range');
        
        if (index === num) {
            const sameSrc = box.children[0].children[0].src;
            boxes.forEach((item) => {
                const currBox = (sameSrc === item.children[0].children[0].src)
                    ? item.children[0].classList.add('this_img')
                    : item.children[0].classList.remove('this_img');
            });
        }
    });
};