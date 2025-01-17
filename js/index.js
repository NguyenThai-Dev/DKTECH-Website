const slider = document.getElementById('img_change_slider');
const spinner = document.getElementById('loading-spinner');
const sliderContainer = document.getElementById('slider-container');
const images = sliderContainer.querySelectorAll('img');
const dots = document.querySelectorAll('.dot');
let currentImg = 0;
const interval = 3000; // Thời gian chuyển slide
let timer;

// Tải ảnh trước
function preloadImages(images, callback) {
	let loadedImages = 0;
	const totalImages = images.length;

	images.forEach((img) => {
		const tempImg = new Image();
		// Thêm tham số ngẫu nhiên vào URL để tránh cache
		tempImg.src = `${img.src}?${new Date().getTime()}`;
		tempImg.onload = () => {
			loadedImages++;
			if (loadedImages === totalImages) {
				callback();
			}
		};
		tempImg.onerror = () => {
			console.error(`Error loading image: ${tempImg.src}`);
			loadedImages++;
			if (loadedImages === totalImages) {
				callback();
			}
		};
	});
}

// Hiển thị slider sau khi tải ảnh
function showSlider() {
	spinner.style.display = 'none'; // Ẩn spinner
	slider.classList.remove('hidden'); // Hiển thị slider
	initSlider();
}

// Chuyển đổi slide
function changeSlide(n) {
	if (n !== undefined) {
		clearInterval(timer);
		timer = setInterval(autoSlide, interval);
		currentImg = n;
	}

	// Dịch chuyển container sang trái theo tỷ lệ phần trăm
	const translateValue = -100 * currentImg;
	sliderContainer.style.transform = `translateX(${translateValue}%)`;

	// Cập nhật dot active
	dots.forEach((dot, index) => {
		dot.classList.toggle('active', index === currentImg);
	});

	// Khi tới ảnh cuối, tiếp tục chuyển sang ảnh đầu nhưng phải chờ đủ thời gian
	if (currentImg === images.length - 1) {
		setTimeout(() => {
			// Đưa ảnh đầu tiên vào vị trí tiếp theo
			sliderContainer.style.transition = 'none'; // Tắt hiệu ứng chuyển đổi
			sliderContainer.style.transform = `translateX(0%)`; // Đưa slider về ảnh đầu
			currentImg = 0; // Đặt lại chỉ số ảnh
		}, interval); // Sau khi đủ thời gian

		setTimeout(() => {
			sliderContainer.style.transition = 'transform 0.8s ease-in-out'; // Bật lại hiệu ứng
		}, interval + 50); // Một chút thời gian để ảnh đầu được đưa vào
	}
}

// Tự động chuyển slide
function autoSlide() {
	currentImg = (currentImg + 1) % images.length;
	changeSlide();
}

// Khởi tạo slider
function initSlider() {
	timer = setInterval(autoSlide, interval);
}

// Kiểm tra xem ảnh có được tải trước đó hay không
window.addEventListener('load', () => {
	if (slider.classList.contains('hidden')) {
		preloadImages(images, showSlider);
	} else {
		initSlider(); // Nếu slider đã được hiển thị, chỉ cần khởi tạo lại
	}
});

//Slider cho thẻ sản phẩm
document.querySelectorAll('.product-list-container').forEach((slider) => {
	const prevBtn = slider.querySelector('.prev-btn');
	const nextBtn = slider.querySelector('.next-btn');
	const productList = slider.querySelector('.product-list');
	const productItems = slider.querySelectorAll('.product-item');

	let currentIndex = 0;
	let visibleItems = parseInt(slider.getAttribute('data-visible-items'));
	let margin = '1rem';

	// Cập nhật lại số lượng sản phẩm hiển thị
	const updateVisibleItems = () => {
		const width = window.innerWidth;

		if (width <= 480) {
			visibleItems = 1;
		} else if (width <= 768) {
			visibleItems = 2;
		} else if (width <= 1200) {
			visibleItems = 3;
		} else {
			visibleItems = 4;
		}

		// Cập nhật CSS linh động cho sản phẩm
		productItems.forEach((item, index) => {
			item.style.flex = `0 0 calc(100% / ${visibleItems} - ${(visibleItems - 1) / visibleItems} * ${margin})`;
		});
		slider.setAttribute('data-visible-items', visibleItems);
		updateSliderPosition();
	};

	// Cập nhật vị trí slider
	const updateSliderPosition = () => {
		// Điều chỉnh offsetX sao cho dịch chuyển theo nhóm sản phẩm
		const offsetX = -(currentIndex * (100 / visibleItems));
		productList.style.transform = `translateX(${offsetX}%)`;
		for (let i = currentIndex; i < currentIndex + visibleItems - 1; i++) {
			productItems[i].style.marginRight = margin;
		}
		if (currentIndex - 1 > 0) productItems[currentIndex - 1].style.marginRight = 0;
	};

	// Xử lý nút Next
	nextBtn.addEventListener('click', () => {
		if (currentIndex + visibleItems >= productItems.length) {
			currentIndex = 0;
		} else {
			currentIndex += visibleItems;
		}
		updateSliderPosition();
	});

	// Xử lý nút Prev
	prevBtn.addEventListener('click', () => {
		if (currentIndex - visibleItems < 0) {
			currentIndex = 0;
		} else {
			currentIndex -= visibleItems;
		}
		updateSliderPosition();
	});

	// Lắng nghe sự kiện thay đổi kích thước màn hình
	window.addEventListener('resize', updateVisibleItems);

	// Khởi tạo visibleItems lần đầu
	updateVisibleItems();
});

//Hiệu ứng ảnh chạy
