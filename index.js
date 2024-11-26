//làm ảnh chuyển động trang index
var imgs = document.querySelectorAll('#slider img');
var dots = document.querySelectorAll('.dot');
var currentImg = 0;
const interval = 3000;
function changeSlide(n) {
    if (n !== undefined) {
        clearInterval(timer);
        timer = setInterval(autoSlide, interval);
        currentImg = n;
    }
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.opacity = 0;
        dots[i].classList.remove('active');
    }
    imgs[currentImg].style.opacity = 1;
    dots[currentImg].classList.add('active');
}
function autoSlide() {
    currentImg = (currentImg + 1) % imgs.length;
    changeSlide();
}
var timer = setInterval(autoSlide, interval);