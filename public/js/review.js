document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.js-testimonials-slider', {
        // Optional parameters
        grabCursor: true,
        spaceBetween: 30,
        // If we need pagination
        pagination: {
            el: '.js-testimonials-pagination',
            clickable: true
        },
        breakpoints: {
            1000: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    });
});