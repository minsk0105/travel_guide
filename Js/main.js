window.addEventListener('DOMContentLoaded', () => {

    // header
    const headerState = (this.window.scrollY !== 0)
        ? $('header').addClass('scrolled')
        : $('header').removeClass('scrolled');

    let foodVaseValue = null; // food value
    
    window.addEventListener('scroll', () => {
        const currentY = this.window.scrollY;

        const headerState = (this.window.scrollY !== 0)
            ? $('header').addClass('scrolled')
            : $('header').removeClass('scrolled');

        $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);

        // food scroll
        const foodContents = document.querySelector('.food_contents');
        const foodBoxes = document.querySelectorAll('.food_left > div');
        const foodRect = foodContents.getBoundingClientRect().top;

        if (foodRect <= 60 && foodVaseValue === null) {
            foodVaseValue = currentY;
        } else if (foodRect > 60 && foodVaseValue !== null) foodVaseValue = null;
        
        if (foodRect <= 60 && foodVaseValue !== null) {
            const startPoint = currentY - foodVaseValue;

            if (startPoint <= (foodContents.offsetHeight + 60)) {

                let order = Math.floor(startPoint / window.innerHeight);
                const detail = startPoint - ((window.innerHeight) * order);

                if (order < foodBoxes.length) {
                    foodBoxes[order].classList.add('scroll_show');
                    if (detail >= (window.innerHeight * .5)) foodBoxes[order].classList.remove('scroll_show');
                }

            }
        }
    });

    // food map load
    const map = L.map('map', {
        center: [33.3616666, 126.5291666],
        zoom: 10
    });

    const tiles = L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);



    // category
    const cateBoxes = document.querySelectorAll('.cate_box');

    cateBoxes.forEach((box) => {
        const filterShade = Array.from(box.querySelectorAll('.cover'));
        const target = box.children[1].children[0].textContent;
        let size;

        box.addEventListener('mouseover', () => {
            for (let i = 0; i < filterShade.length; i++) {
                if (target === "f") {
                    size = 50;
                    if (i === 2) filterShade[i].style.transform = `translate(${size}%, ${size}%)`;
                    else {
                        const rest = (i === 1) ? filterShade[i].style.transform = `translateY(${size * (-2)}%)` : filterShade[i].style.transform = `translateX(${size * (-2)}%)`;
                    }
                }
                else if (target === "o") {
                    size = 50;
                    const currIndex = (i === 0)
                        ? filterShade[i].style.transform = `scale(1.4)`
                        : filterShade[i].style.transform = `translateY(${size}%)`;
                }
                else {
                    size = 35;
                    if (i === 0) filterShade[i].style.transform = `translate(-${size}%, -${size}%)`;
                    else if (i === 1) filterShade[i].style.transform = `translate(${size}%, -${size}%)`;
                    else filterShade[i].style.transform = `translate(0, ${size}%)`;
                }
            }
        });

        box.addEventListener('mouseout', () => filterShade.forEach(item => item.style.transform = `translate(0, 0)`));
    });

    // attractions
    let getJson;
    fetch("Js/place.json")
    .then((res) => {
        return res.json();
    })
    .then(data => {
        getJson = data;
    });

    const swiper = document.querySelector('.swiper');
    const attrBoxes = document.querySelectorAll('.attr_box');
    const swipBtns = document.querySelectorAll('.swip_btn button');

    let boxWidth = 700;
    let sweptPage = -boxWidth;
    let index = 1;

    const newLastBox = attrBoxes[attrBoxes.length - 1].cloneNode(true);
    newLastBox.classList.add('out_range');
    swiper.prepend(newLastBox);

    swiper.style.width = `calc(70rem * ${attrBoxes.length + 1})`;
    swiper.style.transform = `translateX(-${boxWidth}px)`;

    attrBoxes.forEach((item, index) => {
        if (index > 1) item.classList.add('out_range');
    });

    swipBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            clicked(btn);
        });
    });

    function clicked(btn) {
        const boxes = document.querySelectorAll('.attr_box');
        swiper.style.transition = 'var(--swiping)';

        if (btn.classList.contains('next')) {
            sweptPage -= boxWidth; index += 1;
        } else {sweptPage += boxWidth; index -= 1;}

        const generation = (thisBox, prevBox, order) => {
            setTimeout(() => {
                const copy = thisBox.cloneNode(true);
                prevBox.remove();
                swiper[order](copy);

                sweptPage = -boxWidth;
                index = 1;
                swiper.style.transition = '0s';
                swiper.style.transform = `translateX(${sweptPage}px)`;
            }, 600);
        };

        if (sweptPage < 0) {
            const prevBox = boxes[index - 2];
            const thisBox = boxes[index - 1];
            generation(thisBox, prevBox, "appendChild");
        } else {
            const prevBox = boxes[boxes.length - 1];
            const thisBox = boxes[boxes.length - 2];
            generation(thisBox, prevBox, "prepend");
        }
        
        swiping(index, boxes);

        swipBtns.forEach((btn) => {
            btn.style.pointerEvents = 'none';
            setTimeout(() => btn.style.pointerEvents = 'auto', 600);
        });

        swiper.style.transform = `translateX(${sweptPage}px)`;
    };

    function swiping(index, boxes) {
        boxes.forEach((box, num) => {
            const isRange = (num < index || num > (index + 1))
                ? box.classList.add('out_range')
                : box.classList.remove('out_range');
            
            if (index === num) {
                const thisImg = box.children[0].children[0].src;
                boxes.forEach((item) => {
                    const currentBox = (thisImg === item.children[0].children[0].src)
                        ? item.children[0].classList.add('this_img')
                        : item.children[0].classList.remove('this_img');
                });
            }

        });
    };

});