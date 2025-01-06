// header tự động
document.getElementById('header').innerHTML = `
    <div id = "header_logo" >
        <img src="./css/img/LOGO DKTECH-Khongbg.png" alt="Logo DKTECH">
        <div>
            <p>CÔNG TY TNHH THIẾT BỊ CÔNG NGHIỆP DKTECH VIỆT NAM</p>
        	<p>Địa chỉ: KP.Mỹ Hảo 2, P.Chánh Mỹ, TP.Thủ Dầu Một, T.Bình Dương, Việt Nam</p>
        </div>
    </div>
    <div id="header_contact">
        <div>
			<a href="#" id="call_button">
				<p><i class="fa-solid fa-phone"></i><span style="font-weight: bold;">Tel:</span> 0949 238 778</p>
			</a>
			<a href="#" id="send_email_button">
				<p><i class="fa-regular fa-envelope"></i><span style="font-weight: bold;">Email:</span>
					khoa.dktech@gmail.com</p>
			</a>
			<a href="https://thuvienphapluat.vn/ma-so-thue/cong-ty-tnhh-thiet-bi-cong-nghiep-dktech-viet-nam-mst-3702744647.html"
				target="_blank">
				<p><i class="fa-solid fa-money-check-dollar"></i><span style="font-weight: bold;">MST:</span> 3702744647
				</p>
			</a>
		</div>
    </div>
    <div id="check_box">
        <div id="confirm_an_action">
            <p>Bạn muốn liên hệ trực tiếp cho chúng tôi?</p>
            <div class="button_container">
                <button id="confirm">Xác nhận</button>
                <button id="cancel">Hủy</button>
            </div>
        </div>
    </div>`;

document.getElementById('navbar').innerHTML = `
<div id="navbar_pc">
            <ul>
                <li class="navbar_pc_item"><a href="./index.html">TRANG CHỦ</a></li>
                <li class="navbar_pc_item"><a href="#">GIỚI THIỆU</a></li>
                <li class="navbar_pc_item"><a href="#">DẦU NHỚT CHÍNH HÃNG</a></li>
                <li class="navbar_pc_item"><a href="#">DỊCH VỤ</a></li>
                <li class="navbar_pc_item"><a href="./news.html">TIN TỨC</a></li>
                <li class="navbar_pc_item"><a href="./Contact.html">LIÊN HỆ</a></li>
            </ul>
        </div>
        <div id="navbar_pc_menu">
            <ul id="navbar_pc_menu_item">
                <li class="navbar_pc_menu_item_type"><a href="./SHL-KOREA-PRODUCTS.html">SHL KOREA</a></li>
                <li class="navbar_pc_menu_item_type"><a href="./TECTYL-PRODUCTS.html">TECTYL</a></li>
                <li class="navbar_pc_menu_item_type"><a href="#">IDEMITSU</a></li>
                <li class="navbar_pc_menu_item_type"><a href="#">SHELL</a></li>
                <li class="navbar_pc_menu_item_type"><a href="#">CASTROL</a></li>
                <li class="navbar_pc_menu_item_type"><a href="#">MOBIL</a></li>
                <li class="navbar_pc_menu_item_type"><a href="#">TOTAL</a></li>
                <li class="navbar_pc_menu_item_type"><a href="#">CALTEX</a></li>
                <li class="navbar_pc_menu_item_type"><a href="#">TRIM</a></li>
            </ul>
        </div>
        <div id="navbar_toggle" onclick="toggleNavbar()">☰ Menu</div>
        <div id="navbar_phone">
            <ul>
                <li class="navbar_phone_item"><a href="./index.html">TRANG CHỦ</a></li>
                <li class="navbar_phone_item"><a href="#">GIỚI THIỆU</a></li>
                <li class="navbar_phone_item">
                    <a href="#" onclick="activeNavbarPhoneMenuItem('navbar_phone_menu_item');changeArrowDirection();">DẦU NHỚT CHÍNH HÃNG</a>
                    <i class="fa-solid fa-arrow-right right-arrow"></i>
                </li>
                <ul id="navbar_phone_menu_item">
                    <li class="navbar_phone_menu_item_type"><a href="./SHL-KOREA-PRODUCTS.html">SHL KOREA</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="./TECTYL-PRODUCTS.html">TECTYL</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="#">IDEMITSU</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="#">SHELL</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="#">CASTROL</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="#">MOBIL</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="#">TOTAL</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="#">CALTEX</a></li>
                    <li class="navbar_phone_menu_item_type"><a href="#">TRIM</a></li>
                </ul>
                <li class="navbar_phone_item"><a href="#">DỊCH VỤ</a></li>
                <li class="navbar_phone_item"><a href="./news.html">TIN TỨC</a></li>
                <li class="navbar_phone_item"><a href="./Contact.html">LIÊN HỆ</a></li>
            </ul>
        </div>`;

document.getElementById('footer').innerHTML = `
			<div id="footer_info">
			<div id="footer_logo">
				<img src="./css/img/LOGO DKTECH-Khongbg.png" alt="DKTECH Logo" />
				<p class="company_name">CÔNG TY TNHH THIẾT BỊ CÔNG NGHIỆP DKTECH VIỆT NAM</p>
				<p class="company_address">
					<i class="fa-solid fa-map-location"></i>
					Số 58, Đường N3-7, KĐT Sinh Thái Chánh Mỹ, Tổ 15, Khu Phố Mỹ Hảo 2, Phường Chánh Mỹ, Thành Phố Thủ Dầu Một,
					Tỉnh Bình Dương, Việt Nam
				</p>
				<a href="#" id="call_button">
					<p>
						<i class="fa-solid fa-phone"></i>
						<span style="font-weight: bold">Tel:</span>
						0949 238 778
					</p>
				</a>
				<a href="mailto:khoa.dktech@gmail.com" id="send_email_button">
					<p>
						<i class="fa-regular fa-envelope"></i>
						<span style="font-weight: bold">Email:</span>
						khoa.dktech@gmail.com
					</p>
				</a>
			</div>
			<div id="footer_link">
				<div id="footer_link_list">
					<div id="quick_link">
						<h2>Đường Dẫn Quan Trọng</h2>
						<ul>
							<li><a href="./404Page.html">Điều Khoản Mua Hàng</a></li>
							<li><a href="./404Page.html">Chính Sách Công Ty</a></li>
							<li><a href="./404Page.html">Câu Hỏi Thường Gặp (FAQ)</a></li>
							<li><a href="./Contact.html">Đăng Ký Nhận Tin Tức</a></li>
						</ul>
					</div>
					<div id="support_list">
						<h2>Hỗ Trợ Khách Hàng</h2>
						<ul>
							<li><a href="./404Page.html">Hướng Dẫn Mua Hàng</a></li>
							<li><a href="./404Page.html">Chính Sách Giao Hàng</a></li>
							<li><a href="./404Page.html">Hỗ Trợ Kỹ Thuật</a></li>
							<li><a href="./404Page.html">Yêu Cầu Báo Giá</a></li>
						</ul>
					</div>
					<div id="services_list">
						<h2>Dịch Vụ</h2>
						<ul>
							<li><a href="./404Page.html">Tư Vấn Kỹ Thuật</a></li>
							<li><a href="./404Page.html">Dịch Vụ Thay Dầu</a></li>
							<li><a href="./404Page.html">Kiểm Tra Định Kỳ</a></li>
						</ul>
					</div>
				</div>
				<div class="image-marquee">
					<div class="image-track">
						<img src="./css/img/tectyl_logo.png" alt="Tectyl_logo" />
						<img src="./css/img/SHL Logo.png" alt="SHL_logo" />
						<img src="./css/img/master fluid.png" alt="Master_fluid_logo" />
						<img src="css/img/Castrol.png" alt="Castrol_logo" />
						<img src="./css/img/Total S.A..png" alt="Total_logo" />
						<img src="./css/img/Mobil Oil.png" alt="Mobil_logo" />
						<img src="./css/img/Royal-Dutch-Shell-Logo-PNG-HD-Quality.png" alt="Shell_logo" />
						<img src="./css/img/caltex.png" alt="Caltex_logo" />
						<img src="./css/img/Idemitsu Kosan.png" alt="Idemitsu_logo" />
					</div>
				</div>
			</div>
		</div>
		<div id="Owner">Copyright © 2024 DKTECH Team</div>`;

document.getElementById('c-circle-nav').innerHTML = `
<button id="c-circle-nav__toggle" class="c-circle-nav__toggle">
                <span>Toggle</span>
            </button>
            <ul class="c-circle-nav__items">
                <li class="c-circle-nav__item">
                    <a href="./404Page.html" class="c-circle-nav__link">
                        <img src="data:image/png;base64,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"
                            alt="facebook-new">
                    </a>
                </li>
                <li class="c-circle-nav__item">
                    <a href="./404Page.html" class="c-circle-nav__link">
                        <img src="data:image/png;base64,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"
                            alt="zalo">
                    </a>
                </li>
                <li class="c-circle-nav__item">
                    <a href="tel:0949238778" class="c-circle-nav__link">
                        <img src="data:image/png;base64,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"
                            alt="apple-phone">
                    </a>
                </li>
                <li class="c-circle-nav__item">
                    <a href="mailto:khoa.dktech@gmail.com" class="c-circle-nav__link">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHgklEQVR4nO1ceWwUVRzePzxA/JfOPGhTrnKUU1GQozPbC6iFlpK0WthChAItsaUcLZRC2x3QhD+EAnIaYgVErhivKCpnADkNiFzl6C6XxBgkSD1Q4Wd+064s7czu7O7MvGH3fcmXNNOdd3zfe29+782bZ7MxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDD4QVSU0JvnhQqeCHs5XqzjidDAExHCk0JDYx3FPVFEmId1p9ZAotoJgzgi7qcvikjblCMcJ9pNEz42VmzFEWED/YqLliJHxFrUxlDxo6KSOJ6IR2lXlrcshSOokSHio7uYAf1KipYmR4QT0dGvtNbdADbsiIH0hPd1FZ8QIcGn67xwnSNCGUYFHJfaxham4LjUNlHth/bhiDCH44UbvjQhxD5Et4x5Xjykmhkvrjeky1kcWGds6T4a5UFdMkLH1cc7sdYW4eB54T1VfbjEnnpkUKE27ERiy28OQvo/x/PiTZUGWm4LFTjrU3ZXLPV3L1x7pzW4JQe4pG3glurA5WwAtwThxhULJ6oMz8Ku0A3gxYsqBvTyKX599QRwSddpiwMm8OzuMkUD4rok3wrdACLcUzZAOdqBE2ufBpe0lrYoYCIbzlUpGtC5cxKA27kGNQnBAOUHjNrvwS2tpi0IUKCaTo3/d643xQB52LGAGGA5A2Q6DDUAXFWtwO28RlsIMJk3j82DkvzX/Rvgct7AoMQ4AzDasYAgYBLvnqmEhaXjoUOHJJ/LEo/d55LGGtgD5FATwp33L1XD6rcnQfduKX7XhGJi7M3v32KgAc7LtMUBA/mg3gnbV0+Dl14Y7ld4D3OzxjRPp85IA8JykgVuCfZuLYFkIV2z8KSdCFnpo+Hvy9WPp+WS7hlnQLNCH/t8Jny4ogAu7Z9LXUAIkj/sLIXsUaM1Cx8TkwjzisbBLyfnq6ZpuAHYVfPHZXu1BjtMdmRD/cFy6oKCRl79rhwKx+fIZdfW4u0wJS9HUx0NN2DHmmmqrWP+dAfcPrWAusCgQizbgpI8uaxaW/2Y9NFw8svZmvMw3ICKYofPAneNS4blCyfBn3VV1AX38I8LVVDjnCiXTavwiQnpsGtzccB5GW7AusX5mirwYt/hsHVVoTxk0RL+3ytO2LS8APr1HqZZeCz3lpXBl9twA3Bhyj70Vc0VSk5Ih33bppsu/s6NRSAM1l7Obl1T4N1Fofdcww1A3jtXCW+V+Z8l8l58LTMLznxbZrjwx7+YBRkjMjWXKzY2EapnjYc7p/V5dpligIe3jlfA7MKx0D5aezQx2ZEtRyF6C3/lwFw5ba2RTbv2jWVxH9K3LKYa4GHd3jlyZbS2upimiAnXW/SIbBaVTQgossnJyIIfvykNKB+cdFXOyJOHKiT+3WIiRssAD/dvL4EUcaRmIbp3S5Ff9/11sWVF/PH381XyvXFdtEc2wxJHwoEdJUEZvaCkZfSH1yxlAPKhywmfrX8TBvQfoVmY/v2Gw7ZVhfK9Wlrixpqp0KdXakDp4z2hRGRKi3N4zXIGeAu1bnF+QLH3iORRcOjjGappfr2pGAa/nKY5vR7dG3sYrnCGOtSp5WFZAzy8c7pxjMZoI5AxGl+EBxvZdOyYJOepxzPGDAMeKiT8UC8DoIkYbUx1aF9/iY6xQ0FejmyGVuHxnlkFuXDrRIVuwhtuAMeL15onitf0NgCaeOqr2fL6ilZRg+01T44BRChuYQARio0yALxmqgmDtM9U1TgyNQOOfjrTMOENNwBBSMI43OWFxL+VfmNEpR7UO+Xop28AazUeDhmYJkdbWiInyxugBUavVq7QGNPH90iRo6t/Lpu7yBfWBkATf/5+PpQXOaBL55ZGYC+pqX5DnoCZKXxEGQBNxBVJfE+7oWaKvDSMYzwuLdMQPiINAAuSGeAOUwPi4+Of4YiwhOPFX2USYQleYz1AMscAjheWtpyICUuZAZJZBoi3FWbCt5kBkjkGqCXMDJCYAWCB6If1ADd98dkQ5GYGsIkYYQ9hCNMhSPkz1bZtxee9f2eFYQAo8bezlYri4+pt6AZo/FCbtghAkWd2KX+oPXhAmg4GEHG3ogFEKGMGSLKouNtbSSP8uCNkA/B0QEUDeOGG92EdtFshUCK+LFLbXY3GhGwADjVqDxiOiB9EugEzp+SqPoBxS2bIBsgm8MJBHybU4pEttIUACi2/aJL6B9qZaZmK9wVlACHiULWMZPLiTexu+DCi9UoQTCDWDbfQL5Mm+v2oAz9S1M0AuRcQsdanCYzg0WDG5Fw1E++GemzlYSa06HcfkvpeU+cFW+gHt7KzQ3kV8dNTM3x+IwxuaXNIBnj1BNXTAiN52Lnvb5e1qzrXphc4zj6QI8I+2hXnLdDqD3+ivmXea/hxw8Vlz+pmwCMjEnvi6YA4Y46LS/qpUyftH+bxTxixbrjlEWe4GPVd2NMyzldv/UEcVRMMIvXIMvDNlaaI//+hfcwE8Bp6VgFUPWWaAY+foBV5R5jBI141bdhRNQHPkXNJY/GkKIyBw/lMIWis23lwOz/CaAfrTlV8BgYGBgYGBgYGBgYGBgYGBgab1fAf5ZsyfE9rAFAAAAAASUVORK5CYII="
                            alt="new-post"> </a>
                </li>
                <li class="c-circle-nav__item">
                    <a href="https://maps.app.goo.gl/4YWVVpS74heCd2My6" target="_blank" class="c-circle-nav__link">
                        <img src="data:image/png;base64,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"
                            alt="map-marker">
                    </a>
                </li>
            </ul>`;
//animation cần thiết
function slideDownNavbar(navbar) {
	var navbar_items = document.querySelectorAll('.navbar_phone_item');
	setTimeout(() => {
		navbar.style.opacity = 1;
		navbar.style.zIndex = 100;
	}, 100);
	navbar.style.display = 'block';
	for (let index = 0; index < navbar_items.length; index++) {
		var item = navbar_items[index];
		item.style.animation = `slideDown 0.5s ease-out forwards`;
		for (let index1 = index + 1; index1 < navbar_items.length; index1++) {
			var item1 = navbar_items[index1];
			item1.style.opacity = 0;
		}
		item.style.animationDelay = `${index * 0.1}s`;
	}
}
function slideUpNavbar(navbar) {
	var navbar_items = document.querySelectorAll('.navbar_phone_item');
	for (let index = navbar_items.length - 1; index >= 0; index--) {
		var item = navbar_items[index];
		item.style.animation = `slideUp 0.5s ease-out forwards`;
		for (let index1 = index - 1; index1 >= 0; index1--) {
			var item1 = navbar_items[index1];
			item1.style.opacity = 1;
		}
		item.style.animationDelay = `${(navbar_items.length - 1 - index) * 0.1}s`;
	}
	setTimeout(() => {
		navbar.style.display = 'none';
		navbar.style.opacity = 0;
	}, navbar_items.length * 100);
}
function slideUpLiWithAnimation(navbar) {
	const items = navbar.querySelectorAll('li');
	const totalHeight = items.length * 30;
	let currentHeight = totalHeight;
	const decrement = 5;

	const interval = setInterval(() => {
		currentHeight -= decrement;
		navbar.style.height = `${currentHeight}px`;

		items.forEach((item, index) => {
			if (currentHeight < (index + 1) * 30) {
				item.style.opacity = 0;
				item.style.display = 'none';
			}
		});

		if (currentHeight <= 0) {
			clearInterval(interval);
			navbar.style.display = 'none';
			navbar.style.height = '0';
		}
	}, 16);
}

function slideDownLiWithAnimation(navbar) {
	const items = navbar.querySelectorAll('li');
	const totalHeight = items.length * 30;
	let currentHeight = 0;
	const increment = 5;

	navbar.style.display = 'block';
	navbar.style.height = '0';

	const interval = setInterval(() => {
		currentHeight += increment;
		navbar.style.height = `${currentHeight}px`;

		items.forEach((item, index) => {
			if (currentHeight >= (index + 1) * 30) {
				item.style.display = 'block';
				item.style.opacity = 1;
			}
		});

		// Dừng khi đạt chiều cao tổng
		if (currentHeight >= totalHeight) {
			clearInterval(interval);
			navbar.style.height = 'auto';
		}
	}, 16);
}

function slideDownLi(navbar) {
	var navbar_items = navbar.querySelectorAll('li');
	setTimeout(() => {
		navbar.style.opacity = 1;
	}, navbar_items.length * 100);
	navbar.style.display = 'block';
	for (let index = 0; index < navbar_items.length; index++) {
		var item = navbar_items[index];
		item.style.animation = `slideDown 0.5s ease-out forwards`;
		item.style.display = 'block';
		for (let index1 = index + 1; index1 < navbar_items.length; index1++) {
			var item1 = navbar_items[index1];
			item1.style.opacity = 0;
		}
		item.style.animationDelay = `${index * 0.1}s`;
	}
}

function slideUpLi(navbar) {
	var navbar_items = navbar.querySelectorAll('li');
	for (let index = navbar_items.length - 1; index >= 0; index--) {
		var item = navbar_items[index];
		item.style.animation = `slideUp 0.5s ease-out forwards`;
		for (let index1 = index - 1; index1 >= 0; index1--) {
			var item1 = navbar_items[index1];
			item1.style.opacity = 1;
		}
		item.style.animationDelay = `${(navbar_items.length - 1 - index) * 0.1}s`;
	}
	setTimeout(() => {
		navbar.style.display = 'none';
	}, navbar_items.length * 100);
}

//Hiệu ứng cho mũi tên
function changeArrowDirection() {
	let icon = document.querySelector('.navbar_phone_item:nth-child(3) i');
	if (icon.classList.contains('right-arrow')) {
		icon.classList.remove('right-arrow');
		icon.classList.add('down-arrow');
	} else {
		icon.classList.remove('down-arrow');
		icon.classList.add('right-arrow');
	}
}

//quản lí sự xuất hiện của navbar phone
function toggleNavbar() {
	var navbar = document.getElementById('navbar_phone');
	var navbar_phone_menu_item = document.getElementById('navbar_phone_menu_item');
	if (navbar.style.display === 'block') {
		slideUpNavbar(navbar);
		if (navbar_phone_menu_item.style.display === 'block') {
			slideUpLi(navbar_phone_menu_item);
			var arrow = document.querySelector('.fa-arrow-right, .down arrow');
			changeArrowDirection(arrow);
		}
	} else {
		slideDownNavbar(navbar);
	}
}

const navbarPhone = document.getElementById('navbar_phone');
function checkWindowSize() {
	if (window.innerWidth > 850) {
		navbarPhone.style.display = 'none';
	} else {
		navbarPhone.style.display = 'block';
	}
}
window.addEventListener('resize', checkWindowSize);

//trình quản lý navbar_pc
const navbar_pc_child = document.querySelector('#navbar_pc ul li:nth-child(3)');
const navbar_pc_menu_item = document.getElementById('navbar_pc_menu_item');
function isHovering(elements) {
	return elements.some((element) => element.matches(':hover'));
}
navbar_pc_child.addEventListener('mouseenter', () => {
	slideDownLi(navbar_pc_menu_item);
});
navbar_pc_child.addEventListener('mouseleave', () => {
	if (!isHovering([navbar_pc_child, navbar_pc_menu_item])) {
		slideUpLi(navbar_pc_menu_item);
	}
});
navbar_pc_menu_item.addEventListener('mouseenter', () => {
	navbar_pc_menu_item.style.display = 'block';
});
navbar_pc_menu_item.addEventListener('mouseleave', () => {
	if (!isHovering([navbar_pc_child, navbar_pc_menu_item])) {
		slideUpLi(navbar_pc_menu_item);
	}
});

//tự động điều chỉnh kích thước một phần tử
const item = document.querySelector('#navbar_pc ul li:nth-child(3)');
const item_relative = document.getElementById('navbar_pc_menu_item');
function adjustWidth() {
	const width_item = item.offsetWidth;
	item_relative.style.width = width_item + 'px';
}
adjustWidth();
window.onresize = adjustWidth;

//quản lý sự xuất hiện của navbar_phone
function activeNavbarPhoneMenuItem(data) {
	var activeNavbar = document.getElementById(data);
	if (activeNavbar.style.display === 'block') slideUpLiWithAnimation(activeNavbar);
	else slideDownLiWithAnimation(activeNavbar);
}

//thực hiện call hoặc gửi email thời gian thực
document.addEventListener('DOMContentLoaded', () => {
	const callButton = document.getElementById('call_button');
	const emailButton = document.getElementById('send_email_button');
	const checkBox = document.getElementById('check_box');
	const confirmAnAction = document.getElementById('confirm_an_action');
	const confirmButton = document.getElementById('confirm');
	const cancelButton = document.getElementById('cancel');
	const startWorkHour = 8;
	const endWorkHour = 17;
	let currentAction = null;
	callButton.addEventListener('click', (event) => {
		event.preventDefault();
		const currentHour = new Date().getHours();
		if (currentHour >= startWorkHour && currentHour < endWorkHour) {
			currentAction = 'call';
			checkBox.style.display = 'block';
			confirmAnAction.style.display = 'block';
			confirmAnAction.querySelector('p').textContent = 'Bạn muốn gọi cho chúng tôi?';
		} else {
			Swal.fire({
				title: 'STOP',
				text: 'Hiện tại đang ngoài giờ làm việc. Vui lòng gửi email hoặc liên hệ vào giờ hành chính.',
				icon: 'warning',
				confirmButtonText: 'OK',
				confirmButtonColor: '#f0ad4e',
				timer: 3000,
			});
		}
	});
	emailButton.addEventListener('click', (event) => {
		event.preventDefault();
		currentAction = 'email';
		checkBox.style.display = 'block';
		confirmAnAction.style.display = 'block';
		confirmAnAction.querySelector('p').textContent = 'Bạn muốn gửi email cho chúng tôi?';
	});
	confirmButton.addEventListener('click', () => {
		if (currentAction === 'call') {
			window.location.href = 'tel:0949238778';
		} else if (currentAction === 'email') {
			window.location.href = 'mailto:khoa.dktech@gmail.com';
		}
		checkBox.style.display = 'none';
		confirmAnAction.style.display = 'none';
	});
	cancelButton.addEventListener('click', () => {
		checkBox.style.display = 'none';
		confirmAnAction.style.display = 'none';
	});
});

// //ngăn hành vi chuột phải
// document.addEventListener('contextmenu', function (event) {
// 	event.preventDefault();
// 	Swal.fire({
// 		title: 'Stop!',
// 		text: 'Xin đừng copy em!',
// 		icon: 'error',
// 		confirmButtonText: 'OK',
// 		confirmButtonColor: '#d33',
// 		timer: 3000,
// 	});
// });
// //Ngăn hành vi mở devtool
// document.addEventListener('keydown', function (event) {
// 	if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
// 		event.preventDefault();
// 		Swal.fire({
// 			title: 'Stop!',
// 			text: 'Xin đừng soi em!',
// 			icon: 'error',
// 			confirmButtonText: 'OK',
// 			confirmButtonColor: '#d33',
// 			timer: 3000,
// 		});
// 	}
// });

//animation cho navbar nhanh
(function () {
	'use strict';

	const menu = document.querySelector('#c-circle-nav');
	const toggle = document.querySelector('#c-circle-nav__toggle');
	const activeClass = 'is-active';
	if (!menu || !toggle) {
		console.error('Menu or toggle button not found!');
		return;
	}
	const mask = document.createElement('div');
	mask.classList.add('c-mask');
	document.body.appendChild(mask);
	toggle.addEventListener('click', (e) => {
		e.preventDefault();
		toggle.classList.contains(activeClass) ? deactivateMenu() : activateMenu();
	});
	mask.addEventListener('click', () => deactivateMenu());
	function activateMenu() {
		menu.classList.add(activeClass);
		toggle.classList.add(activeClass);
		mask.classList.add(activeClass);
	}
	function deactivateMenu() {
		menu.classList.remove(activeClass);
		toggle.classList.remove(activeClass);
		setTimeout(function () {
			mask.classList.remove(activeClass);
		}, 550);
	}
})();
