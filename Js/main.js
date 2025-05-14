// header
window.addEventListener('DOMContentLoaded', () => {
    const actBoxes = document.querySelectorAll('.act_box');

    const headerState = (this.window.scrollY !== 0)
            ? $('header').addClass('scrolled')
            : $('header').removeClass('scrolled');
    
    window.addEventListener('scroll', () => {
        const currentY = this.window.scrollY;
        const headerState = (currentY !== 0)
            ? $('header').addClass('scrolled')
            : $('header').removeClass('scrolled');
        
        $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);

        // food scroll
        const foodBoxes = document.querySelectorAll('.food_left > div');
        
        if (currentY >= 2495 && currentY <= 2495 + (1000 * foodBoxes.length)) {
            const startPoint = (currentY - 2495);
            let order = Math.floor(startPoint / 1000);
            const detail = startPoint - (1000 * order);

            foodBoxes[order].classList.add('scroll_show');
            if (detail >= (1000 * .5)) foodBoxes[order].classList.remove('scroll_show');
        }

        // activities scroll
        const actTxt = document.querySelectorAll('.act_txt > div');
        const startBox = currentY - 7642;
        let order = Math.floor(startBox / 750);

        actTxt.forEach((item, index) => {
            if (order === index) {
                item.classList.add('show_act');
            } else item.classList.remove('show_act');
        });

        if (currentY >= 7642 && currentY <= 10642) {
            for (let i = 0; i < actBoxes.length; i++) {
                const scale = (startBox / 10000) - ((750 / 10000) * i);
                if (order >= i) {
                    actBoxes[i].style.transform = `scale(calc(1 - ${scale}))`;
                    actBoxes[i].style.clipPath = `polygon(${scale * 4}% 0%, ${100 - (scale * 4)}% 0%, ${100 - (scale * 6)}% 100%, ${scale * 6}% 100%)`;
                    actBoxes[i].style.marginBottom = `40rem`;
                }
            }
        }
        else if (currentY >= 10642) {
            for (let i = 0; i < actBoxes.length; i++) {
                actBoxes[i].style.marginBottom = `${(actBoxes.length - i) * 30}px`;
            }
        }

        if (currentY >= 7342) {
            $('#activities').css('background-color', 'black');
            $('.activities > h1').css('color', '#eee');
        } else {
            $('#activities').css('background-color', 'white');
            $('.activities > h1').css('color', 'black');
        }
    });

    $('.act_items').css('height', `${750 * (actBoxes.length + 1)}px`);
    for (let i = 0; i < actBoxes.length; i++) {
        actBoxes[i].style.top = `calc(22.7rem + ${i * 30}px)`;
    }

    // category
    const cateBoxes = document.querySelectorAll('.cate_box');
    
    cateBoxes.forEach((box) => {
        const filterShade = Array.from(box.querySelectorAll('.cover'));
        const thisCate = box.children[1].children[1].textContent;
        const thisTag = box.children[1].children[0];

        box.addEventListener('mouseover', () => {
            for (let i = 0; i < filterShade.length; i++) {
                if (thisCate === 'ood') {
                    if (i === 2) filterShade[i].style.transform = `translate(50%, 50%)`;
                    else if (i === 1) filterShade[i].style.transform = `translateY(-100%)`;
                    else filterShade[i].style.transform = `translateX(-100%)`;
                } else if (thisCate === 'ther') {
                    if (i === 0) filterShade[i].style.transform = `scale(1.4)`;
                    else filterShade[i].style.transform = `translateY(50%)`;
                }
                else {
                    if (i === 0) filterShade[i].style.transform = `translate(-35%, -35%)`;
                    else if (i === 1) filterShade[i].style.transform = `translate(35%, -35%)`;
                    else filterShade[i].style.transform = `translate(0, 35%)`;
                }
            }

            // thisTag.classList.add('tag');
        });

        box.addEventListener('mouseout', () => {
            // thisTag.classList.remove('tag');
            filterShade.forEach(item => item.style.transform = `translate(0, 0)`);
        });
    });
    
});

// attractions
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