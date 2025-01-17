const imgList = [
	'./css/Oil img/SHL SYNTHDRO 32AW.jpg',
	'./css/Oil img/SHL SPINDLE V5.jpg',
	'./css/Oil img/SHL SAMLEX WAXY 70A.jpg',
	'./css/Oil img/SHL SAMLEX HP 5025V.jpg',
	'./css/Oil img/SHL SPINDLE V10.jpg',
];

const slidesContainer = document.querySelector('.slides');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const overlay = document.createElement('div');
overlay.classList.add('overlay');

let index = 0;
let zoomIndex = 0;

let isClicking = false;

function createSliderImages() {
	slidesContainer.innerHTML = '';
	imgList.forEach((url, i) => {
		const img = document.createElement('img');
		img.src = url;
		img.style.display = i === index ? 'block' : 'none';
		img.addEventListener('click', () => {
			openOverlay(i);
		});
		slidesContainer.appendChild(img);
	});
}

function updateSlider() {
	const images = slidesContainer.querySelectorAll('img');
	images.forEach((img, i) => {
		img.style.display = i === index ? 'block' : 'none';
	});
	updateDots();
}

function updateDots() {
	dotsContainer.innerHTML = '';
	imgList.forEach((_, i) => {
		const dot = document.createElement('button');
		dot.classList.add('dot');
		if (i === index) dot.classList.add('active');
		dot.addEventListener('click', () => {
			index = i;
			updateSlider();
		});
		dotsContainer.appendChild(dot);
	});
}

prevBtn.addEventListener('click', () => {
	if (isClicking) return;
	isClicking = true;

	setTimeout(() => {
		isClicking = false;
	}, 500);

	index = (index - 1 + imgList.length) % imgList.length;
	updateSlider();
});

nextBtn.addEventListener('click', () => {
	if (isClicking) return;
	isClicking = true;

	setTimeout(() => {
		isClicking = false;
	}, 500);

	index = (index + 1) % imgList.length;
	updateSlider();
});

function openOverlay(startIndex) {
	zoomIndex = startIndex;

	function updateOverlayImage() {
		const existingImage = overlay.querySelector('.overlay-image');
		if (existingImage) {
			existingImage.remove();
		}

		const fullImg = document.createElement('img');
		fullImg.src = imgList[zoomIndex]; // Lấy ảnh từ danh sách zoom
		fullImg.classList.add('overlay-image');
		overlay.appendChild(fullImg);
	}

	if (!overlay.querySelector('.overlay-close')) {
		const closeIcon = document.createElement('i');
		closeIcon.className = 'fa-solid fa-xmark overlay-close';
		closeIcon.addEventListener('click', () => {
			overlay.remove();
		});
		overlay.appendChild(closeIcon);
	}

	const overlayPrev = document.createElement('button');
	overlayPrev.innerHTML = '&#10094';
	overlayPrev.classList.add('overlay-prev');
	overlayPrev.addEventListener('click', () => {
		overlayPrev.disabled = true;
		overlayNext.disabled = true;
		setTimeout(() => {
			zoomIndex = (zoomIndex - 1 + imgList.length) % imgList.length;
			updateOverlayImage();
			overlayPrev.disabled = false;
			overlayNext.disabled = false;
		}, 250);
	});
	overlay.appendChild(overlayPrev);
	const overlayNext = document.createElement('button');
	overlayNext.innerHTML = '&#10095';
	overlayNext.classList.add('overlay-next');
	overlayNext.addEventListener('click', () => {
		overlayPrev.disabled = true;
		overlayNext.disabled = true;

		setTimeout(() => {
			zoomIndex = (zoomIndex + 1) % imgList.length;
			updateOverlayImage();
			overlayPrev.disabled = false;
			overlayNext.disabled = false;
		}, 250);
	});
	overlay.appendChild(overlayNext);
	updateOverlayImage();

	if (!document.body.contains(overlay)) {
		document.body.appendChild(overlay);
	}
}

function initSlider() {
	createSliderImages();
	updateSlider();
}

initSlider();
