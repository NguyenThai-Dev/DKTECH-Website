//Hiển thị thanh kiểm soát loại dầu
function toggleAside(info) {
	var aside = document.getElementById(info);
	var originalBodyHeight = document.body.style.height;
	if (getComputedStyle(aside).display === 'none') {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		aside.style.display = 'block';
		document.body.style.height = aside.offsetHeight;
		document.body.style.overflow = 'hidden';
		if (!document.getElementById('close_icon')) {
			const close_icon = document.createElement('i');
			close_icon.className = 'fa-solid fa-xmark';
			close_icon.id = 'close_icon';
			close_icon.style.position = 'absolute';
			close_icon.style.top = '10px';
			close_icon.style.right = '10px';
			close_icon.style.cursor = 'pointer';
			close_icon.addEventListener('click', () => {
				aside.style.display = 'none';
				document.body.style.height = originalBodyHeight || 'auto';
				document.body.style.overflow = 'auto';
				close_icon.remove();
			});
			aside.appendChild(close_icon);
		}
		document.querySelectorAll('.category-toggle').forEach((button) => {
			button.addEventListener('click', (event) => {
				const targetId = event.target.dataset.target;
				const targetElement = document.getElementById(targetId);
				if (targetElement) {
					setTimeout(() => {
						targetElement.scrollIntoView({ behavior: 'smooth' });
					}, 500);
					aside.style.display = 'none';
					document.body.style.height = originalBodyHeight || 'auto';
					document.body.style.overflow = 'auto';
				}
			});
		});
	} else {
		aside.style.display = 'none';
		document.body.style.height = originalBodyHeight || 'auto';
		document.body.style.overflow = 'auto';
	}
}

//Hành vi cuộn
const scrollToTopButton = document.getElementById('scrollToTopButton');
function updateScrollButton() {
	if (window.scrollY > 100) {
		scrollToTopButton.style.display = 'block';
	} else {
		scrollToTopButton.style.display = 'none';
	}
}
window.addEventListener('DOMContentLoaded', updateScrollButton);
window.addEventListener('pageshow', updateScrollButton);
window.addEventListener('scroll', updateScrollButton);
scrollToTopButton.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function () {
	const categories = document.querySelectorAll('.category');
	const buttons = document.querySelectorAll('.category-toggle');

	// Kiểm tra trạng thái từ sessionStorage
	const storedCategoryId = sessionStorage.getItem('activeCategory') || 'category-1';
	const storedPage = parseInt(sessionStorage.getItem('activePage')) || 1; // Trang mặc định là 1 nếu không có lưu

	let activeCategory = document.getElementById(storedCategoryId);
	activeCategory.classList.add('active');

	// Nếu danh mục chưa được tải, thì tải dữ liệu
	if (!activeCategory.hasAttribute('data-loaded') || activeCategory.getAttribute('data-loaded') === 'false') {
		loadProductsForCategory(activeCategory, storedPage); // Gọi với trang lưu trữ
		activeCategory.setAttribute('data-loaded', 'true');
	}

	// Thêm sự kiện click cho từng nút
	buttons.forEach((button) => {
		button.addEventListener('click', function () {
			categories.forEach((category) => {
				category.classList.remove('active');
			});
			buttons.forEach((btn) => {
				btn.classList.remove('active-button');
			});

			// Xác định danh mục mục tiêu và kích hoạt nó
			const targetCategoryId = button.getAttribute('data-target');
			const targetCategory = document.getElementById(targetCategoryId);
			targetCategory.classList.add('active');
			window.scrollTo({ top: 175, behavior: 'smooth' });

			// Nếu danh mục chưa được tải, tải dữ liệu và đánh dấu là đã tải
			if (!targetCategory.hasAttribute('data-loaded') || targetCategory.getAttribute('data-loaded') === 'false') {
				loadProductsForCategory(targetCategory, 1); // Mặc định là trang 1 khi chuyển danh mục
				targetCategory.setAttribute('data-loaded', 'true');
			}

			// Lưu trạng thái danh mục đang hoạt động vào sessionStorage
			sessionStorage.setItem('activeCategory', targetCategoryId);
			sessionStorage.setItem('activePage', 1); // Chuyển danh mục sẽ quay về trang 1
			button.classList.add('active-button');
		});
	});
});
// Tạo sản phẩm cho mỗi danh mục
function loadProductsForCategory(category, page = 1) {
	const categoryId = category.id;
	const productsData = getProductsForCategory(categoryId);

	// Số sản phẩm trên mỗi trang
	const productsPerPage = 9;
	const totalProducts = productsData.length;
	const totalPages = Math.ceil(totalProducts / productsPerPage);

	// Xác định sản phẩm cần hiển thị trên trang hiện tại
	const startIndex = (page - 1) * productsPerPage;
	const endIndex = page * productsPerPage;
	const productsToDisplay = productsData.slice(startIndex, endIndex);

	// Xóa nội dung hiện tại trước khi thêm sản phẩm mới
	let productsList = category.querySelector('.products_list');
	if (!productsList) {
		productsList = document.createElement('div');
		productsList.classList.add('products_list');
		category.appendChild(productsList);
	} else {
		productsList.innerHTML = ''; // Làm rỗng trước khi thêm sản phẩm mới
	}

	// Thêm các sản phẩm vào danh sách
	productsToDisplay.forEach((product) => {
		const productElement = createProductElement(product);
		productsList.appendChild(productElement);
	});

	// Cập nhật phân trang
	updatePagination(category, page, totalPages);
}

// Cập nhật phân trang
function updatePagination(category, currentPage, totalPages) {
	let paginationHTML = '';

	// Tạo danh sách số trang
	for (let page = 1; page <= totalPages; page++) {
		if (page === currentPage) {
			// Trang hiện tại (highlight)
			paginationHTML += `<button class="pagination-btn active_numpage" data-page="${page}">${page}</button>`;
		} else {
			// Trang khác
			paginationHTML += `<button class="pagination-btn" data-page="${page}">${page}</button>`;
		}
	}

	// Thêm phân trang vào danh mục
	let paginationContainer = category.querySelector('.pagination');
	if (!paginationContainer) {
		paginationContainer = document.createElement('div');
		paginationContainer.classList.add('pagination');
		category.appendChild(paginationContainer);
	}

	paginationContainer.innerHTML = paginationHTML;

	// Lắng nghe sự kiện click cho các nút phân trang
	const paginationButtons = paginationContainer.querySelectorAll('.pagination-btn');
	paginationButtons.forEach((button) => {
		button.addEventListener('click', function () {
			const targetPage = parseInt(button.getAttribute('data-page'));
			window.scrollTo({ top: 175, behavior: 'smooth' });
			loadProductsForCategory(category, targetPage);
			sessionStorage.setItem('activePage', targetPage); // Lưu trang hiện tại vào sessionStorage
		});
	});
}

//Tạo phần tử HTML cho mỗi sản phẩm
function createProductElement(product) {
	const productLink = document.createElement('a');
	checkLinkExists(product.link).then((exists) => {
		if (exists) {
			productLink.href = product.link;
		} else {
			productLink.href = '404PAGE.html';
		}
		productLink.classList.add('product_link');

		let productForHTML = '';
		if (product.for) {
			productForHTML = `<p class="product_for"><strong>Dành cho:</strong> ${product.for}</p>`;
		}

		productLink.innerHTML = `
            <div class="product_detail">
                <div class="product_display">
                    <div class="wrapper_img">
                        <img src="${product.imageNormal}" alt="${product.type}" class="normal_img">
                        <img src="${product.imageAlt}" alt="${product.type}" class="product_img">
                    </div>
                </div>
                <div class="product_info">
                    <h2 class="product_type">${product.type}</h2>
                    <p class="product_benefit"><strong>Công dụng:</strong> ${product.benefit}</p>
                    ${productForHTML}
                </div>
            </div>
        `;
	});

	return productLink;
}

// Hàm kiểm tra xem trang có tồn tại không
function checkLinkExists(url) {
	if (url === '#') {
		return Promise.resolve(false);
	}
	return fetch(url, { method: 'HEAD' })
		.then((response) => response.ok)
		.catch(() => false);
}

function getProductsForCategory(categoryId) {
	const productsData = {
		//Dầu cắt gọt pha nước
		'category-1': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 260',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 281',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 290',
				benefit: 'Cắt gọt và Mài',
				for: 'Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 296K',
				benefit: 'Cắt gọt và Mài',
				for: 'Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 299',
				benefit: 'Cắt gọt và Mài',
				for: 'Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 140',
				benefit: 'Cắt gọt',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 240',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 230B',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 630',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 353',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 531',
				benefit: 'Mài',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 550R',
				benefit: 'Mài',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Cool 552',
				benefit: 'Mài',
				for: 'Fe',
			},
		],
		//dầu cắt gọt không pha nước
		'category-2': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 012',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 120',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 412',
				benefit: 'Cắt gọt, Mài và Cắt gọt nặng',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 413E',
				benefit: 'Cắt gọt, Mài và Cắt gọt nặng',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 415',
				benefit: 'Cắt gọt, Mài và Cắt gọt nặng',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 423',
				benefit: 'Cắt gọt, Mài và Cắt gọt nặng',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 424',
				benefit: ' Cắt gọt, Mài và Cắt gọt nặng',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 523',
				benefit: 'Mài và Cắt gọt nặng',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl CUT 532',
				benefit: 'Mài và Cắt gọt nặng',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl EDM 702',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl FIN 804',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl FIN 806',
				benefit: 'Cắt gọt và Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl GRINGD 606',
				benefit: 'Cắt gọt',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl GRINGD 610',
				benefit: 'Cắt gọt',
				for: 'Fe',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl MQL 905',
				benefit: 'Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl MQL 910A',
				benefit: 'Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl MQL 932',
				benefit: 'Mài',
				for: 'Fe và Kim loại màu',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl MQL 940',
				benefit: 'Mài',
				for: 'Fe và Kim loại màu',
			},
		],
		//Dầu chống gỉ
		'category-3': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
		],
		//Dầu xử lý nhiệt
		'category-4': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
		],
		//Dầu tẩy rửa
		'category-5': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
		],
		//Dâu tách khuôn
		'category-6': [],
		//Dầu bôi trơn công nghiệp
		'category-7': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power 32',
				benefit: 'Chống mài mòn (thông dụng)',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power 46',
				benefit: 'Chống mài mòn (thông dụng)',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power 68',
				benefit: 'Chống mài mòn (thông dụng)',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power S46',
				benefit: 'Chống mài mòn cao cấp',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power S68',
				benefit: 'Chống mài mòn cao cấp',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power S46 VI',
				benefit: 'Chỉ số độ nhớt cao',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power S68 VI',
				benefit: 'Chỉ số độ nhớt cao',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power S46 SV',
				benefit: 'Dùng cho Servo Valve',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl Power S100 SV',
				benefit: 'Dùng cho Servo Valve',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl HF 46',
				benefit: 'Chống cháy dạng tổng hợp',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl HF 56',
				benefit: 'Chống cháy dạng tổng hợp',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl SAFE 38',
				benefit: 'Chống cháy dạng water-glycol',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl SAFE 46',
				benefit: 'Chống cháy dạng water-glycol',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl FR 68',
				benefit: 'Độ chớp cháy cao',
				for: '',
			},
		],
		//MỠ bôi trơn
		'category-8': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
		],
		//Dầu gia công định hình
		'category-9': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
		],
		//Dầu cán
		'category-10': [
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
			{
				link: '',
				imageNormal: './css/img/Tectyl oil bottle.jpg',
				imageAlt: './css/img/Tectyl oil bucket.jpg',
				type: 'Tectyl ',
				benefit: '',
				for: '',
			},
		],
	};
	return productsData[categoryId] || [];
}
