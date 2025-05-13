window.addEventListener('DOMContentLoaded', () => { 

    // $('body').css('overflow', 'hidden');
    // setTimeout(() => {
    //     $('body').css('overflow', 'auto');
    // }, 4500);

    const actBoxes = document.querySelectorAll('.act_box');
        
    window.addEventListener('scroll', () => {
        const currentY = this.window.scrollY;
        const headerState = (currentY !== 0)
            ? $('header').addClass('scrolled')
            : $('header').removeClass('scrolled');

        $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);

        // food scroll
        const foodBoxes = document.querySelectorAll('.food_left > div');
        
        if (currentY >= 2280 && currentY <= 2280 + (800 * foodBoxes.length)) {
            const startPoint = (currentY - 2280);
            let order = Math.floor(startPoint / 800);
            const detail = startPoint - (800 * order);
            
            foodBoxes[order].classList.add('scr_show');

            if (detail >= (800 * 0.9)) {
                foodBoxes[order].classList.remove('scr_show');
            }
        }

        /* activities scroll */
        const startBox = currentY - 6500;
        let order = Math.floor(startBox / 350);
        
        if (currentY >= 6500) {
            for (let i = 0; i < actBoxes.length; i++) {
                if (order >= i) {
                    actBoxes[i].style.transform = `scale(calc(1 - ${(startBox / 10000) - ((350 / 10000) * i)}))`
                }
            }
        }
    });

    $('.act_items').css('height', `${410 * (actBoxes.length + 1)}px`);
    for (let i = 0; i < actBoxes.length; i++) {
        actBoxes[i].style.top = `calc(40% - (35rem / 2) + ${i * 30}px)`;
    }
});

let getJson;
fetch("Js/place.json")
.then((res) => {
    return res.json();
})
.then(data => {
    getJson = data;
    expInfo();
});

const swiper = document.querySelector('.swiper');
const boxes = document.querySelectorAll('.attr_box');
const btns = document.querySelectorAll('.swip_btn button');
swiper.style.width = `calc(70rem * ${boxes.length})`;

let sweptPage = -1400;
let index = 2;

btns.forEach((btn) => {
    btn.addEventListener('click', () => {

        if (btn.classList.contains('next')) {
            sweptPage -= 700; index += 1;
        } else {sweptPage += 700; index -= 1;}

        expInfo();

        const listLength = -700 * (getJson.length + 1);
        const totalIndex = getJson.length + 1;

        if (sweptPage === -700 || sweptPage === (listLength + -700)) {
            setTimeout(() => {
                swiper.style.transition = '0s';

                if (sweptPage === -700) {
                    index = totalIndex;
                    sweptPage = listLength;
                } else {
                    index = 2;
                    sweptPage = -1400;
                }

                swiper.style.transform = `translateX(${sweptPage}px)`;
                swiping(index, totalIndex);
            }, 600);
        }

        swiping(index, totalIndex);

        btns.forEach((btn) => {
            btn.style.pointerEvents = 'none';
            setTimeout(() => {
                btn.style.pointerEvents = 'auto';
            }, 600);
        });

        boxes.forEach(box => box.style.transition = '.5s ease-in-out');
        swiper.style.transition = '.6s ease-in-out';
        swiper.style.transform = `translateX(${sweptPage}px)`;

    });
});

function swiping(index, total) {
    const prevRange = index - 1;
    const nextRange = index + 2;

    boxes.forEach((box, num) => {
        if (index === 2 || index === total) box.style.transition = '0s';

        const isRange = (num < prevRange || num > nextRange)
            ? box.classList.add('out_range')
            : box.classList.remove('out_range');
        
        if (index === num) {
            const sameSrc = box.children[0].children[0].src;
            boxes.forEach((item) => {
                const currentBox = (sameSrc === item.children[0].children[0].src)
                    ? item.children[0].classList.add('this_img')
                    : item.children[0].classList.remove('this_img');
            });
        }
    });
};

function expInfo() {
    $('.place_tag').empty();

    for (let i = 0; i < getJson.length; i++) {
        let boxNum = index - 1;

        if (boxNum > getJson.length) boxNum = boxNum - getJson.length;
        else if (boxNum < 1) boxNum = boxNum + getJson.length;

        if (boxNum === getJson[i].id) {
            $('.place > p').text(`${getJson[i].address}`);
            $('.fee > p').text(`Admission Fee : ${getJson[i].fee}`);

            for (let j = 0; j < getJson[i].tag.length; j++) {
                const newTag = document.createElement('span');
                newTag.textContent = '#' + getJson[i].tag[j];
                $('.place_tag').append(newTag);
            }
        }
    }
};

/* map load */
const map = L.map('map', {
    center: [33.3616666, 126.5291666],
    zoom: 10
});

const tiles = L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);