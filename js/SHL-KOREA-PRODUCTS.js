//Hiển thị thanh kiểm soát loại dầu
function toggleAside(info) {
	var aside = document.getElementById(info);
	var originalBodyHeight = document.body.style.height;
	if (getComputedStyle(aside).display === 'none') {
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
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL F10',
				benefit: 'Cắt và mài cho ADC, AL50, 60',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL F14',
				benefit: 'Cắt và mài cho ADC, AL50, 60',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL EA 650F',
				benefit: 'Cắt và mài cho ADC, AL50, 60',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL K5V',
				benefit: 'Cắt và mài cho ADC, AL50, 60',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL K7E',
				benefit: 'Cắt và mài cho ADC, AL50, 60',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong_thuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL V1',
				benefit: 'Cắt & mài & đúc sắt',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong_thuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL E1',
				benefit: 'Cắt & mài & đúc sắt',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong_thuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL EF100H',
				benefit: 'Cắt & mài, đúc sắt',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=nhu_tuong_thuong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL EF 150H',
				benefit: 'Cắt & mài & đúc thép Cacbon, thép hợp kim',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=chuyen_dung',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL EC-1',
				benefit: 'Vật liệu chính: Đồng',
				for: 'Hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Nhu_tuong.html?tab=chuyen_dung',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL KF 600EP',
				benefit: 'Cắt cứng cho thép, thép hợp kim',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Ban-tong-hop.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL KF3A',
				benefit: ' Cắt & mài cho Nhôm',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Ban-tong-hop.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL KF3E',
				benefit: ' Cắt & mài & đúc sắt, thép',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Ban-tong-hop.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL KF3HV',
				benefit: ' Cắt & mài & đúc sắt, thép',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=cat_mai',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-401E',
				benefit: 'Mài cho ổ trục',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=cat_mai',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-401K',
				benefit: 'Cắt & mài & đúc sắt, thép',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=cat_mai',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-601',
				benefit: 'Cắt & mài & đúc sắt, thép',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=mai',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-9G',
				benefit: 'Mài',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=mai',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-BC2',
				benefit: 'Mài',
				for: 'Hợp kim thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=chuyen_dung',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-401J',
				benefit: 'Cắt và mài cho kính di động',
				for: 'Hợp kim phi thép(Điều kiện nhất định)',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=chuyen_dung',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-601G',
				benefit: 'Sử dụng cho các bộ phận ô tô bằng nhôm',
				for: 'Hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=chuyen_dung',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-701V',
				benefit: 'Sử dụng cho các bộ phận ô tô bằng nhôm',
				for: 'Hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=chuyen_dung',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL S-801',
				benefit: 'Sử dụng cho SUS, Thép',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-pha-nuoc-Tong-hop.html?tab=chuyen_dung',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSOL FG7',
				benefit: 'Sử dụng cho Vonfram',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
		],
		//dầu cắt gọt không pha nước
		'category-2': [
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=mai_lo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HONING 70',
				benefit: 'Mài lỗ cho SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=mai_lo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HONING 7P',
				benefit: 'Mài lỗ cho nhôm đồng/hợp kim kẽm, SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=mai_lo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HONING 13V',
				benefit: 'Mài lỗ cho nhôm đồng/hợp kim kẽm, SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=mai_lo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HONING 26V',
				benefit: 'Mài lỗ cho nhôm đồng/hợp kim kẽm, SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 2AL',
				benefit: 'Tiện cho nhôm, đồng/hợp kim kẽm',
				for: 'Hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 60N3',
				benefit: 'Tiện cho hợp kim thép, nhôm, đồng/hợp kim kẽm',
				for: 'Hợp kim thép vfa hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 2G',
				benefit: 'Cắt kính',
				for: 'Hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 11B',
				benefit: 'Cắt cho hợp kim thép, nhôm, đồng/hợp kim kẽm, SUS và Ti/W',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 15B3-1',
				benefit: 'Cắt cho hợp kim thép, nhôm, đồng/hợp kim kẽm, SUS và Ti/W',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 32B',
				benefit: 'Mài lỗ cho SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 4525I',
				benefit: 'Mài lỗ cho nhôm đồng/hợp kim kẽm, SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 4525',
				benefit: ' Mài lỗ cho hợp kim thép',
				for: 'Hợp kim thép và hợp kim phí thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 4530V-2',
				benefit: 'Mài lỗ cho nhôm đồng/hợp kim kẽm, SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat_none_clo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 4213',
				benefit: 'Mài lỗ cho nhôm đồng/hợp kim kẽm, SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat_none_clo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 150TB',
				benefit: 'Tiện cho nhôm, đồng/hợp kim kẽm',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat_none_clo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 300TB',
				benefit: 'Mài lỗ cho nhôm đồng/hợp kim kẽm, SUS',
				for: 'Hợp kim thép và hợp kim phi thép',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat_none_clo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 2221',
				benefit: 'Cắt kính',
				for: 'Hợp kim thép và hợp kim phi thép (có điều kiện)',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc.html?tab=cat_none_clo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL FOUNTCUT 2228',
				benefit: 'Cắt cho hợp kim thép, nhôm, đồng/hợp kim kẽm, SUS và Ti/W',
				for: 'Hợp kim thép và hợp kim phi thép (có điều kiện)',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc-Sam.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMIST 226EP',
				benefit: 'Minimum Quantity Lubrication',
				for: 'Hợp kim thép, nhôm',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc-Sam.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSTER T2600',
				benefit: 'Minimum Quantity Lubrication',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc-Sam.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMSTER T4600',
				benefit: 'Minimum Quantity Lubrication',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc-Edm.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL EDM 30',
				benefit: 'Electric Discharge Machining Oil',
				for: 'Nhôm',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc-Edm.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL EDM 32',
				benefit: 'Electric Discharge Machining Oil',
				for: 'Nhôm',
			},
			{
				link: './SHL-Dau-cat-got-khong-pha-nuoc-Edm.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL EDM 34',
				benefit: 'Electric Discharge Machining Oil',
				for: 'Nhôm',
			},
		],
		//Dầu chống gỉ
		'category-3': [
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dung_moi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX 2256 (S)',
				benefit: 'Chống gỉ dưới 1 tháng',
				for: 'Phun, ngâm, quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dung_moi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX 2212T',
				benefit: 'Chống gỉ từ 1-2 tháng',
				for: 'Phun, ngâm, quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dung_moi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX 4616S',
				benefit: 'Chống gỉ từ 3-4 tháng',
				for: 'Phun, ngâm, quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dung_moi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX 5060GD',
				benefit: 'Chống gỉ từ 3-4 tháng',
				for: 'Phun, ngâm, quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dung_moi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX 48M',
				benefit: 'Chống gỉ từ 4-6 tháng',
				for: 'Phun, ngâm, quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dung_moi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX HP 5025V',
				benefit: 'Chống gỉ từ 4-6 tháng',
				for: 'Phun, ngâm, quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dung_moi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX 5120K',
				benefit: 'Chống gỉ trong 6 tháng',
				for: 'Phun, ngâm, quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_mo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX WAXY 70A',
				benefit: 'Mỡ chống gỉ trên 12 tháng',
				for: 'Quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_dau',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX 13',
				benefit: 'Chống gỉ dưới 1 tháng',
				for: 'Ngâm, Quét',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_pha_nuoc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX WED 300K',
				benefit: 'Chống gỉ dưới 1 tuần',
				for: 'Phun, ngâm',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_pha_nuoc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX WED 500K',
				benefit: 'Chống gỉ dưới 1 tuần',
				for: 'Phun, ngâm',
			},
			{
				link: './SHL-Dau-chong-gi.html?tab=loai_pha_nuoc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SAMLEX WED 2000',
				benefit: 'Chống gỉ dưới 1 tuần',
				for: 'Phun, ngâm',
			},
		],
		//Dầu xử lý nhiệt
		'category-4': [
			{
				link: './SHL-Dau-xu-li-nhiet.html?tab=loai_nguoi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL QUENCH 100A',
				benefit: 'Thời gian làm mát (800-400℃): 2.6',
				for: 'Loại nguội',
			},
			{
				link: './SHL-Dau-xu-li-nhiet.html?tab=loai_nguoi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL QUENCH 100B',
				benefit: 'Thời gian làm mát (800-400℃): 2.8',
				for: 'Loại nguội',
			},
			{
				link: './SHL-Dau-xu-li-nhiet.html?tab=loai_ban_nong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MARQUENCH 100',
				benefit: 'Thời gian làm mát (800-400℃): 4.3',
				for: 'Loại bán nóng',
			},
			{
				link: './SHL-Dau-xu-li-nhiet.html?tab=loai_ban_nong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MARQUENCH 100S',
				benefit: 'Thời gian làm mát (800-400℃): 3.6',
				for: 'Loại bán nóng',
			},
			{
				link: './SHL-Dau-xu-li-nhiet.html?tab=loai_pha_nuoc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SOL-QUENCH 7 NF',
				benefit: 'Thời gian làm mát (800-400℃): 3.0',
				for: 'Loại pha nước',
			},
		],
		//Dầu tẩy rửa
		'category-5': [
			{
				link: './SHL-Dau-tay-rua.html?tab=thep',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL CLEAN 100E',
				benefit: 'Ngâm, siêu âm, xịt',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua.html?tab=thep_mau',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL CLEAN GK',
				benefit: 'Xịt',
				for: 'Hợp kim thép; Nhôm, đồng/Hợp kim kẽm (có điều kiện)',
			},
			{
				link: './SHL-Dau-tay-rua.html?tab=thep_mau',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL CLEAN 90E',
				benefit: 'Ngâm, xịt',
				for: 'Hợp kim thép; Nhôm, đồng/Hợp kim kẽm (có điều kiện)',
			},
			{
				link: './SHL-Dau-tay-rua.html?tab=thep_mau',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL CLEAN 100A',
				benefit: 'Ngâm, siêu âm, xịt',
				for: 'Hợp kim thép, nhôm; Đồng/Hợp kim kẽm (có điều kiện)',
			},
			{
				link: './SHL-Dau-tay-rua.html?tab=thep_mau',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL CLEAN 300',
				benefit: 'Ngâm, xịt',
				for: 'Hợp kim thép, nhôm; Đồng/Hợp kim kẽm (có điều kiện)',
			},
			{
				link: './SHL-Dau-tay-rua.html?tab=san',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL CLEAN X',
				benefit: 'Ngâm, xịt',
				for: 'Tẩy rửa sàn hợp kim thép; Nhôm, đồng/Hợp kim kẽm (có điều kiện)',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 200L',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 200K',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 210',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 250',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 300',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=khong_mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 100D',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=khong_mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 200M',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-tay-rua-Hidrocacbon.html?tab=khong_mui',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WHITE 200M-1',
				benefit: 'Ngâm, siêu âm, xịt, thủ công',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
		],
		//Dâu tách khuôn
		'category-6': [
			{
				link: './SHL-Dau-tach-khuon.html?tab=nhom',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL RE 1800H',
				benefit: 'Tách khuôn đúc nhôm',
				for: ' (Tổng vật rắn: 18%)',
			},
			{
				link: './SHL-Dau-tach-khuon.html?tab=nhom',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL RE 2200H',
				benefit: 'Tách khuôn đúc nhôm',
				for: ' (Tổng vật rắn: 22%)',
			},
			{
				link: './SHL-Dau-tach-khuon.html?tab=ren',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HF RE 070',
				benefit: 'Tách khuôn để rèn nóng',
				for: ' (Tổng vật rắn(19%)',
			},
			{
				link: './SHL-Dau-tach-khuon.html?tab=betong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL LUBRIC M010',
				benefit: 'Tách khuôn bê tông',
				for: 'Công trình bê tông',
			},
			{
				link: './SHL-Dau-tach-khuon.html?tab=betong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL LUBRIC M020',
				benefit: 'Tách khuôn bê tông',
				for: 'Công trình bê tông',
			},
		],
		//Dầu định hình
		'category-7': [
			{
				link: './SHL-Dau-dinh-hinh.html?tab=keo_ap_luc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL DRAW 30 HA',
				benefit: 'Định hình sâu, nén và dập',
				for: 'Kim loại sắt, hợp kim thép',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=keo_ap_luc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL DRAW 150HA',
				benefit: 'Kéo dập sâu và blanking',
				for: 'Kim loại sắt, hợp kim thép',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=keo_ap_luc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL DRAW V150HA-2',
				benefit: 'Kéo dập sâu và blanking',
				for: 'Kim loại sắt, hợp kim thép',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=keo_ap_luc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL DRAW 2047L-3',
				benefit: 'Dầu kéo',
				for: 'Kim loại sắt, hợp kim thép',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=keo_ap_luc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PRESS 6L',
				benefit: 'Dầu kéo',
				for: 'Kim loại màu',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=keo_ap_luc',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PRESS 12L',
				benefit: 'Dập và uốn',
				for: 'Kim loại màu',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=heading',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL THREAD 1',
				benefit: 'Dầu HEADING',
				for: '',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=heading',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HEADING PRO 6H-1',
				benefit: 'Dầu HEADING',
				for: 'Rèn nguội cho thép, SUS',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=heading',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HEADING 100P',
				benefit: 'Dầu HEADING',
				for: '',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=heading',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HEADING 150P',
				benefit: 'Dầu HEADING',
				for: '',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=heading',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HEADING 170P',
				benefit: 'Dầu HEADING',
				for: '',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=heading',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL HEADING L325',
				benefit: 'Rèn nguội cho thép, SUS',
				for: '',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH 200H',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH 540',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, SUS',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH 6000',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH F1',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH G010',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH G020',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH H',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH H-1',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH H-2',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH H-3',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH HN',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH K9HS',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH M1',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, SUS; Nhôm (có điều kiện)',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH M2',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, SUS; Nhôm (có điều kiện)',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=dap',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL PUNCH Q4T',
				benefit: 'Dầu dập bay hơi nhanh',
				for: 'Hợp kim thép, SUS; Nhôm (có điều kiện)',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=keo_day',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL WIRE DRAW 240',
				benefit: 'Dầu kéo dây',
				for: 'Hợp kim thép, SUS',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=ong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL DRAW 460 S',
				benefit: 'Dầu kéo ống',
				for: 'Hợp kim thép, nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=ong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL DRAW 800AL',
				benefit: 'Dầu kéo ống',
				for: 'Nhôm, đồng/Hợp kim kẽm',
			},
			{
				link: './SHL-Dau-dinh-hinh.html?tab=ong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL DRAW 7000S',
				benefit: 'Dầu kéo ống',
				for: 'Hợp kim thép, SUS',
			},
		],
		//Dầu cán
		'category-8': [
			{
				link: './SHL-Dau-can-Nhom.html?tab=can_nong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL 32',
				benefit: 'Dầu cán nguội cho nhôm',
				for: 'Nhôm',
			},
			{
				link: './SHL-Dau-can-Nhom.html?tab=can_nong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL 34',
				benefit: 'Dầu cán nguội cho nhôm',
				for: 'Nhôm',
			},
			{
				link: './SHL-Dau-can-Nhom.html?tab=can_nong',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL OIL 36V',
				benefit: 'Dầu cán nguội cho nhôm',
				for: 'Nhôm',
			},
			{
				link: './SHL-Dau-can-Nhom.html?tab=can_nguoi',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL RH 33 DH',
				benefit: 'Dầu cán nóng cho nhôm',
				for: 'Nhôm',
			},
			{
				link: './SHL-Dau-can-Thep.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL WED E1',
				benefit: 'Dầu cán pha nước',
				for: 'Thép',
			},
			{
				link: './SHL-Dau-can-Thep.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL WED 100 HM',
				benefit: 'Dầu cán pha nước',
				for: 'Thép',
			},
			{
				link: './SHL-Dau-can-Inox.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL S-100F',
				benefit: 'Dầu cán Inox',
				for: 'Inox',
			},
			{
				link: './SHL-Dau-can-Inox.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL S-120F',
				benefit: 'Dầu cán Inox',
				for: 'Inox',
			},
			{
				link: './SHL-Dau-can-Inox.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL ROLL SC 0001',
				benefit: 'Dầu cán Inox',
				for: 'Inox',
			},
		],
		//Dầu thủy lực
		'category-9': [
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_ro',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 32RO',
				benefit: 'Loại R&O',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_ro',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 46RO',
				benefit: 'Loại R&O',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_ro',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 68RO',
				benefit: 'Loại R&O',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_ro',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 100RO',
				benefit: 'Loại R&O',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_ro',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 150RO',
				benefit: 'Loại R&O',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 22AW',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 32AW',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 46AW',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 68AW',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 100AW',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 150AW',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 22A0W',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 320AW',
				benefit: 'Loại chống mài mòn',
				for: 'Cao su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon_db',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL 32',
				benefit: 'Loại chống mài mòn đặc biệt',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon_db',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL 46',
				benefit: 'Loại chống mài mòn đặc biệt',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_mon_db',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL 68',
				benefit: 'Loại chống mài mòn đặc biệt',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_nhot_cao',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 32HV',
				benefit: 'Loại chỉ số độ nhớt cao',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_nhot_cao',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 46HV',
				benefit: 'Loại chỉ số độ nhớt cao',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_nhot_cao',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 68HV',
				benefit: 'Loại chỉ số độ nhớt cao',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_nhot_sieu_cao',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL K32SV',
				benefit: 'Loại chỉ số độ nhớt siêu cao',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_nhot_sieu_cao',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL K46SV',
				benefit: 'Loại chỉ số độ nhớt siêu cao',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_nhot_sieu_cao',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL K68SV',
				benefit: 'Loại chỉ số độ nhớt siêu cao',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_khong_kem',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 32AF',
				benefit: 'Loại không kẽm',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_khong_kem',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 46AF',
				benefit: 'Loại không kẽm',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_khong_kem',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO 68AF',
				benefit: 'Loại không kẽm',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_servo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL 32SV',
				benefit: ' LOẠI SERVO VALVE',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_servo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL 46SV',
				benefit: ' LOẠI SERVO VALVE',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_servo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL 68SV',
				benefit: ' LOẠI SERVO VALVE',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_servo',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO SPECIAL 100SV',
				benefit: ' LOẠI SERVO VALVE',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_chay_pha',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO FRW 38A',
				benefit: 'Loại chống cháy pha nước',
				for: 'Cau su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_chay_pha',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO FRW 46A',
				benefit: 'Loại chống cháy pha nước',
				for: 'Cau su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_chay_pha',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO FRW 68A',
				benefit: 'Loại chống cháy pha nước',
				for: 'Cau su Nitrile',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_chay_polieste',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO FR 32',
				benefit: 'Loại chống cháy POLY ESTE',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_chay_polieste',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO FR 46',
				benefit: 'Loại chống cháy POLY ESTE',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_chay_polieste',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO FR 68',
				benefit: 'Loại chống cháy POLY ESTE',
				for: 'Cao su Nitrile, PE',
			},
			{
				link: './SHL-Dau-thuy-luc.html?tab=loai_chong_chay_polieste',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHDRO FR 100',
				benefit: 'Loại chống cháy POLY ESTE',
				for: 'Cao su Nitrile, PE',
			},
		],
		//Dầu truyền nhiệt
		'category-10': [
			{
				link: './SHL-Dau-truyen-nhiet.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL THERM 22',
				benefit: 'Chống oxi hóa',
				for: ' (Dầu gốc khoáng)',
			},
			{
				link: './SHL-Dau-truyen-nhiet.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL THERM 32',
				benefit: 'Chống oxi hóa',
				for: ' (Dầu gốc khoáng)',
			},
			{
				link: './SHL-Dau-truyen-nhiet.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL THERM 46',
				benefit: 'Chống oxi hóa',
				for: ' (Dầu gốc khoáng)',
			},
			{
				link: './SHL-Dau-truyen-nhiet.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL THERM 68',
				benefit: 'Chống oxi hóa',
				for: ' (Dầu gốc khoáng)',
			},
			{
				link: './SHL-Dau-truyen-nhiet.html?tab=tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYN THERM 22L',
				benefit: 'Chống oxi hóa, bốc hơi thấp, hiệu quả cao',
				for: ' (Dầu tổng hợp)',
			},
			{
				link: './SHL-Dau-truyen-nhiet.html?tab=tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYN THERM 32L',
				benefit: 'Chống oxi hóa, bốc hơi thấp, hiệu quả cao',
				for: ' (Dầu tổng hợp)',
			},
			{
				link: './SHL-Dau-truyen-nhiet.html?tab=ban_tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL THERM 22S',
				benefit: 'Chống oxi hóa, bốc hơi thấp, hiệu quả cao',
				for: ' (Dầu bán tổng hợp)',
			},
		],
		//Dầu bánh răng
		'category-11': [
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 68',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 100',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 150',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 220',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 320',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 460',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 680',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 68 AW',
				benefit: 'Chống gỉ tuyệt vời, chống ăn mòn tuyệt vời',
				for: ' (Chống mài mòn)',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 100 AW',
				benefit: 'Chống gỉ tuyệt vời, chống ăn mòn tuyệt vời',
				for: ' (Chống mài mòn)',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 150 AW',
				benefit: 'Chống gỉ tuyệt vời, chống ăn mòn tuyệt vời',
				for: ' (Chống mài mòn)',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 220 AW',
				benefit: 'Chống gỉ tuyệt vời, chống ăn mòn tuyệt vời',
				for: ' (Chống mài mòn)',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 320 AW',
				benefit: 'Chống gỉ tuyệt vời, chống ăn mòn tuyệt vời',
				for: ' (Chống mài mòn)',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 460 AW',
				benefit: 'Chống gỉ tuyệt vời, chống ăn mòn tuyệt vời',
				for: ' (Chống mài mòn)',
			},
			{
				link: './SHL-Dau-banh-rang.html?tab=banh_rang_chong_mon',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL GEAR 680 AW',
				benefit: 'Chống gỉ tuyệt vời, chống ăn mòn tuyệt vời',
				for: ' (Chống mài mòn)',
			},
		],
		//Dầu máy
		'category-12': [
			{
				link: './SHL-Dau-may.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MACHINE 32',
				benefit: 'Chống gỉ, chống ăn mòn',
				for: '',
			},
			{
				link: './SHL-Dau-may.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MACHINE 46',
				benefit: 'Chống gỉ, chống ăn mòn',
				for: '',
			},
			{
				link: './SHL-Dau-may.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MACHINE 48',
				benefit: 'Chống gỉ, chống ăn mòn',
				for: '',
			},
			{
				link: './SHL-Dau-may.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MACHINE 100',
				benefit: 'Chống gỉ, chống ăn mòn',
				for: '',
			},
			{
				link: './SHL-Dau-may.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MACHINE 220',
				benefit: 'Chống gỉ, chống ăn mòn',
				for: '',
			},
		],
		//Dầu rãnh trượt
		'category-13': [
			{
				link: './SHL-Dau-ranh-truot.html?tab=ranh_truot',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHWAY 32M',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-ranh-truot.html?tab=ranh_truot',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHWAY 46M',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-ranh-truot.html?tab=ranh_truot',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHWAY 68M',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-ranh-truot.html?tab=ranh_truot',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHWAY 100M',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-ranh-truot.html?tab=ranh_truot',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHWAY 220M',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-ranh-truot.html?tab=ranh_truot_bam',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHWAY 68HM',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: ' (Bám dính cao)',
			},
			{
				link: './SHL-Dau-ranh-truot.html?tab=ranh_truot_bam',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYNTHWAY 100HM',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: ' (Bám dính cao)',
			},
		],
		//Dầu trục quay
		'category-14': [
			{
				link: './SHL-Dau-truc-quay.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SPINDLE V2',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-truc-quay.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SPINDLE V5',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-truc-quay.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SPINDLE V10',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-truc-quay.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SPINDLE S10',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-truc-quay.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SPINDLE V15',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-truc-quay.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SPINDLE V22',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
			{
				link: './SHL-Dau-truc-quay.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SPINDLE V26',
				benefit: 'Chống gỉ tốt, chống ăn mòn tốt',
				for: '',
			},
		],
		//Dầu máy nén khí
		'category-15': [
			{
				link: './SHL-Dau-may-nen-khi.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL COMPRESSOR 32N-1',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL COMPRESSOR 46N-1',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL COMPRESSOR 68N-1',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=khoang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL COMPRESSOR 100N-1',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYN COMP 32',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYN COMP 46',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SYN COMP 68',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=ban_tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SEMI-SYN COM 32',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=ban_tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SEMI-SYN COM 46',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
			{
				link: './SHL-Dau-may-nen-khi.html?tab=ban_tong_hop',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL SEMI-SYN COM 68',
				benefit: 'Giảm mài mòn, tiết kiêm năng lượng, làm mát, làm kín và làm sạch',
				for: 'Trục vít',
			},
		],
		//Dầu tuabin
		'category-16': [
			{
				link: './SHL-Dau-tuabin.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL TURBINE 32',
				benefit: 'Bôi trơn hộp số tuabin',
				for: '',
			},
			{
				link: './SHL-Dau-tuabin.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL TURBINE 46',
				benefit: 'Bôi trơn hộp số tuabin',
				for: '',
			},
			{
				link: './SHL-Dau-tuabin.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL TURBINE 68',
				benefit: 'Bôi trơn hộp số tuabin',
				for: '',
			},
			{
				link: './SHL-Dau-tuabin.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL TURBINE 100',
				benefit: 'Bôi trơn hộp số tuabin',
				for: '',
			},
		],
		//Dầu hộp số
		'category-17': [
			{
				link: './SHL-Dau-hop-so.html?tab=tay',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MTF 90IV',
				benefit: 'Dầu cầu hộp số',
				for: '',
			},
			{
				link: './SHL-Dau-hop-so.html?tab=vi_sai',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MTF 90V',
				benefit: 'Dầu cầu hộp số',
				for: '',
			},
			{
				link: './SHL-Dau-hop-so.html?tab=tay',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MTF 140IV',
				benefit: 'Dầu cầu hộp số',
				for: '',
			},
			{
				link: './SHL-Dau-hop-so.html?tab=vi_sai',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL MTF 140V',
				benefit: 'Dầu cầu hộp số',
				for: '',
			},
			{
				link: './SHL-Dau-banh-rang-xe-may.html',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'ECO SCOOTER GEAR OIL 80W90',
				benefit: 'Dầu bánh răng xe tay ga',
				for: '',
			},
		],
		//Dầu động cơ
		'category-18': [
			{
				link: './SHL-Dau-dong-co.html?tab=diesel',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'Silk Jet Road 15W40',
				benefit: 'Dầu động cơ Diesel',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=diesel',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'Silk Jet Road 20W50',
				benefit: 'Dầu động cơ Diesel',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=diesel',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'Silk Turbo Road 15W40',
				benefit: 'Dầu động cơ Diesel',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=diesel',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'Silk Turbo Road 20W50',
				benefit: 'Dầu động cơ Diesel',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL OTO SN 10W40',
				benefit: 'Dầu động cơ xăng',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xang',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'SHL OTO SN 15W40',
				benefit: 'Dầu động cơ xăng',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xe_may',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'ECO SN 5W30 (MA)',
				benefit: 'Dầu động cơ xe máy',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xe_may',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'ECO SJ 20W50 ((MA)',
				benefit: 'Dầu động cơ xe máy',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xe_may',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'ECO SL 10W40 (MA)',
				benefit: 'Dầu động cơ xe máy',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xe_may',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'ECO SL 10W40 (MB)',
				benefit: 'Dầu động cơ xe máy',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xe_may',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'ECO SJ 15W40 (MA)',
				benefit: 'Dầu động cơ xe máy',
				for: '',
			},
			{
				link: './SHL-Dau-dong-co.html?tab=xe_may',
				imageNormal: './css/img/SHL oil bottle.jpg',
				imageAlt: './css/img/SHL oil bucket.jpg',
				type: 'ECO SG 20W50 (MA)',
				benefit: 'Dầu động cơ xe máy',
				for: '',
			},
		],
	};
	return productsData[categoryId] || [];
}
