document.addEventListener("DOMContentLoaded", function () {
    var animationContainers = document.querySelectorAll('.lottie-container');
    animationContainers.forEach(function (container) {
        lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'img/bell.json'
        });
    });
});