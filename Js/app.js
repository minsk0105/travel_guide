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

let page = -1400;
let total = boxes.length - 1;
let index = 2;

const swipBtns = document.querySelectorAll('.swip_btn button');

swipBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains("next")) {
            page -= 700;
            index += 1;
        } else {
            page += 700;
            index -= 1;
        }

        if (page === -700) {
            setTimeout(() => {
                index = 5;
                page = -3500;
                swiper.style.transition = '0s';
                swiper.style.transform = 'translateX(-3500px)';
            }, 600);
        } else if (page === -4200) {
            setTimeout(() => {
                index = 2;
                page = -1400;
                swiper.style.transition = '0s';
                swiper.style.transform = 'translateX(-1400px)';
            }, 600);
        }
        swiper.style.transition = '0.6s ease-in-out';

        boxes.forEach((item, num) => {
            if (index === num) {
                const sameSrc = item.children[0].children[0].src;
                boxes.forEach((box) => {
                    if (sameSrc === box.children[0].children[0].src) {
                        box.children[0].classList.add('curr_img');
                    } else box.children[0].classList.remove('curr_img');
                });
            }
        });

        swipBtns.forEach((btn) => {
            btn.style.pointerEvents = 'none';
            setTimeout(() => {
                btn.style.pointerEvents = 'auto';
            }, 600);
        });

        swiper.style.transform = `translateX(${page}px)`;
    });
});