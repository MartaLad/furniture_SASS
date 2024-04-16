// swiper catalog
let labels = ['1', '2', '3']
const catalogSwiper = new Swiper('.catalog__swiper', {
    //keyboard: true,
    //forceToAxis: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (labels[index]) + "</span>";
        },
    },

    breakpoints: {
        270: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 16,
            grid: {
                rows: 3,
                fill: 'row',
            },
        },
        556: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 32,
            grid: {
                rows: 3,
                fill: 'row',
            },
        },
        993: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 32,
            grid: {
                rows: 3,
                fill: 'row',
            },
        }
    }
});

//input

const inputCatalog = document.querySelectorAll('.catalog__price-filter');
inputCatalog.forEach(function (input) {
    input.addEventListener('input', function () {
        if (this.value.trim().length === 0) {
            this.classList.remove('noempty-catalog')
        } else {
            this.classList.add('noempty-catalog')
        }
    })
})

//input length

document.getElementsByClassName('.catalog__price-filter').onkeydown = function (e) {
    return !(/^[А-Яа-яA-Za-z ]$/.test(e.key));
}

const inputLength = document.querySelectorAll('.catalog__price-filter');

Array.from(inputLength).forEach(input => {
    const min = +input.min;
    const max = +input.max;

    input.addEventListener('input', () => {
        const value = +input.value;
        if (value > max) {
            input.value = max
        } else
            if (value < min) {
                input.value = min
            }
    })
})
