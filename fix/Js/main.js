let getJson;
fetch("Js/place.json")
.then((res) => {
    return res.json();
})
.then(data => {
    getJson = data;
    expInfo();
});

window.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', () => {
        const currentY = this.window.scrollY;
        const headerState = (currentY !== 0)
            ? $('header').addClass('scrolled')
            : $('header').removeClass('scrolled');
        
        $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);

        console.log(currentY);
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

        expInfo();

        const places = -700 * (getJson.length + 1);
        const totalIndex = getJson.length + 1;

        if (page === -700 || page === (places + -700)) {
            setTimeout(() => {
                swiper.style.transition = '0s';
                if (page === -700) {
                    index = totalIndex;
                    page = places;
                    swiper.style.transform = `translateX(${places}px)`;
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

function swiping(index) {
    const prevRange = index - 1;
    const nextRange = index + 2;
    const totalIndex = getJson.length + 1;

    boxes.forEach((box, num) => {
        if (index === 2 || index === totalIndex) box.style.transition = '0s';
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


const foodBtns = document.querySelectorAll('.open');
const foodWraps = Array.from(document.querySelectorAll('.food_wrap'));

foodBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const styles = Array.from(event.target.classList);

        const matched = foodWraps.filter(el =>
            styles.some(cls => el.classList.contains(cls))
        );

        matched.forEach((element) => {
            element.style.transform = 'translate(0)';
        });
    });
});