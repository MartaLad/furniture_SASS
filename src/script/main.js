// header choices
// const element1 = document.querySelector('.header__country');
// const countryChoices = new Choices(element1, {
//     searchEnabled: false,
//     shouldSort: false,
//     placeholder:true,
//     itemSelectText: ""
// })

// const element2 = document.querySelector('.header__category');
// const categoryChoices = new Choices(element2, {
//     searchEnabled: false,
//     shouldSort: false,
//     placeholder:true,
//     itemSelectText: ""
// })




// hero swiper
const heroSwiper = new Swiper('.hero__swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    }
})


// special swiper

let specialSwiper = Swiper
let usefulSwiper = Swiper
let init = false

function swiperMode() {
    let mobile = window.matchMedia('(max-width: 555px)')
    let desktop = window.matchMedia('(min-width: 556px)')

    if (desktop.matches) {
        if (!init) {
            init = true

            specialSwiper = new Swiper('.special__swiper', {
                keyboard: true,
                forceToAxis: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    556: {
                        direction: 'horizontal',
                        slidesPerView: 'auto',
                        slidesPerGroup: 2,
                        spaceBetween: 32,
                    },
                    993: {
                        slidesPerView: 'auto',
                        slidesPerGroup: 3,
                        spaceBetween: 27,
                    },
                    1200: {
                        spaceBetween: 32,
                        slidesPerView: 'auto',
                        slidesPerGroup: 3,
                    }
                }
            })

            usefulSwiper = new Swiper('.useful__swiper', {
                spaceBetween: 32,
                keyboard: true,
                forceToAxis: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    560: {
                        direction: 'horizontal',
                        slidesPerView: 2,
                    },
                    1000: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 2,
                    }
                }
            })
        }

        else if (mobile.matches) {
                specialSwiper.destroy()
                init = false
            }
        }
    }

    window.addEventListener('load', function () {
        swiperMode()
    });

    window.addEventListener('resize', function () {
        swiperMode()
    });

    // useful swiper



    // const usefulSwiper = new Swiper('.useful__swiper', {
    //     spaceBetween: 32,
    //     keyboard: true,
    //     forceToAxis: true,

    //     navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev",
    //     },

    //     breakpoints: {
    //         560: {
    //             direction: 'horizontal',
    //             slidesPerView: 2,
    //         },
    //         1000: {
    //             slidesPerView: 3,
    //         },
    //         1200: {
    //             slidesPerView: 2,
    //         }
    //     },
    // })

    //form
    function formEvent(event) {
        event.preventDefault()
    }

    const sendForm = document.getElementById('form-send')
    sendForm.addEventListener('submit', formEvent)

    //search active 
    const inputSearch = document.querySelector('.header__search-input');

    inputSearch.addEventListener('input', function () {
        if (this.value.trim().length === 0) {
            this.classList.remove('search--active')
        } else {
            this.classList.add('search--active')
        }
    });

    //input 
    const inputForm = document.querySelectorAll('.contacts__input');

    inputForm.forEach(function (input) {
        input.addEventListener('input', function () {
            if (this.value.trim().length === 0) {
                this.classList.remove('noempty');
            } else {
                this.classList.add('noempty');
            }
        })
    });


