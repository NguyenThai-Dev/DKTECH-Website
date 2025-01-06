//Các lớp tile cho bản đồ
const Bstreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
});
const Bsatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
	maxZoom: 20,
});
const Bterrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
});
const Mstreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
});
const Msatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
	maxZoom: 20,
});
const Mterrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
});
//Tạo baseMaps cho cả hai bản đồ
const BbaseMaps = {
	Streets: Bstreets,
	Satellite: Bsatellite,
	Terrain: Bterrain,
};
const MbaseMaps = {
	Streets: Mstreets,
	Satellite: Msatellite,
	Terrain: Mterrain,
};
//Tạo bản đồ chi nhánh phụ
const Brand_office = [11.073298916025369, 106.66119646860787];
const Brand_office_map = L.map('Brand_office_map', {
	center: Brand_office,
	zoom: 15,
	layers: [Bstreets],
});
//Tạo bản đồ chi nhánh chính
const Main_office = [10.988722, 106.627241];
const Main_office_map = L.map('Main_office_map', {
	center: Main_office,
	zoom: 15,
	layers: [Mstreets],
});
L.control.layers(BbaseMaps).addTo(Brand_office_map);
L.control.layers(MbaseMaps).addTo(Main_office_map);
L.marker(Brand_office)
	.addTo(Brand_office_map)
	.bindPopup(
		'<b>CHI NHÁNH CÔNG TY TNHH THIẾT BỊ CÔNG NGHIỆP DKTECH VIỆT NAM</b><br><a href="https://maps.app.goo.gl/nvbsqWYV2YtZXDQJ6" target="_blank">Đường đi!</a>'
	)
	.openPopup();

L.marker(Main_office)
	.addTo(Main_office_map)
	.bindPopup(
		'<b>CÔNG TY TNHH THIẾT BỊ CÔNG NGHIỆP DKTECH VIỆT NAM</b><br><a href="https://maps.app.goo.gl/4YWVVpS74heCd2My6" target="_blank">Đường đi!</a>'
	)
	.openPopup();

//kiểm tra nhập đủ thông tin form contact
document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('button');
	const form = document.querySelector('#contact_form form');

	button.addEventListener('click', async (e) => {
		e.preventDefault();

		// Kiểm tra form hợp lệ
		if (isFormValid()) {
			button.classList.add('onclic');
			setTimeout(async () => {
				try {
					const formData = new FormData(form);
					const data = Object.fromEntries(formData.entries());
					const response = await fetch('http://localhost:3000/send-email', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					});
					if (response.ok) {
						button.classList.remove('onclic');
						button.classList.add('validate');
						setTimeout(() => {
							button.classList.remove('validate');
							form.reset();
							Swal.fire({
								title: 'Thành công!',
								text: 'Email đã được gửi thành công!',
								icon: 'success',
								confirmButtonText: 'OK',
								confirmButtonColor: '#3085d6',
								timer: 3000,
							});
							const contacted = document.getElementById('after_send_contact');
							const contact_form = document.getElementById('contact_form');
							contacted.style.display = 'block';
							contact_form.style.display = 'none';
						}, 1250);
					} else {
						throw new Error('Gửi email thất bại.');
					}
				} catch (error) {
					console.error('Error:', error);
					Swal.fire({
						title: 'Lỗi!',
						text: 'Có lỗi xảy ra. Vui lòng thử lại!',
						icon: 'error',
						confirmButtonText: 'OK',
						confirmButtonColor: '#d33',
						timer: 3000,
					});
				}
			}, 2250);
		} else {
			Swal.fire({
				title: 'Cảnh báo!',
				text: 'Vui lòng nhập đầy đủ thông tin trước khi gửi.',
				icon: 'warning',
				confirmButtonText: 'OK',
				confirmButtonColor: '#f0ad4e',
				timer: 3000,
			});
		}
	});

	function isFormValid() {
		const inputs = form.querySelectorAll('input[required], textarea[required]');
		for (const input of inputs) {
			if (!input.value.trim()) {
				input.focus();
				return false;
			}
		}
		return true;
	}
});
