//animation cần thiết
function slideDownNavbar(navbar) {
    var navbar_items = document.querySelectorAll(".navbar_phone_item");
    setTimeout(() => {
        navbar.style.opacity = 1;
        navbar.style.zIndex = 100;
    }, 100);
    navbar.style.display = "block";
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
    var navbar_items = document.querySelectorAll(".navbar_phone_item");
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
        navbar.style.display = "none";
    }, navbar_items.length * 100);
}
function slideUpLi(navbar) {
    var navbar_items = navbar.querySelectorAll("li");
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
        navbar.style.display = "none";
    }, navbar_items.length * 100);
}
function slideDownLi(navbar) {
    var navbar_items = navbar.querySelectorAll("li");
    setTimeout(() => {
        navbar.style.opacity = 1;
    }, 100);
    navbar.style.display = "block";
    for (let index = 0; index < navbar_items.length; index++) {
        var item = navbar_items[index];
        item.style.pointerEvents = "none";
        item.style.animation = `slideDown 0.5s ease-out forwards`;
        for (let index1 = index + 1; index1 < navbar_items.length; index1++) {
            var item1 = navbar_items[index1];
            item1.style.opacity = 0;
        }
        item.style.animationDelay = `${index * 0.1}s`;
    }
    setTimeout(() => {
        for (let index = 0; index < navbar_items.length; index++) {
            var item = navbar_items[index];
            item.style.pointerEvents = "";
        }
    }, navbar_items.length * 50);
}

//quản lí navbar phone
function toggleNavbar() {
    var navbar = document.getElementById("navbar_phone");
    var navbar_phone_menu_item = document.getElementById("navbar_phone_menu_item");
    var navbar_phone_menu_item_shl = document.getElementById("navbar_phone_menu_item_shl")
    var navbar_phone_menu_item_tectyl = document.getElementById("navbar_phone_menu_item_tectyl")
    if (navbar.style.display === "block") {
        slideUpNavbar(navbar);
        if (navbar_phone_menu_item.style.display === "block") slideUpLi(navbar_phone_menu_item);
        if (navbar_phone_menu_item_tectyl.style.display === "block") activeNavbarPhoneMenuItemType('navbar_phone_menu_item_tectyl', 'Tectyl');
        if (navbar_phone_menu_item_shl.style.display === "block") activeNavbarPhoneMenuItemType('navbar_phone_menu_item_shl', 'SHL');
    } else {
        slideDownNavbar(navbar);
    }
}

const navbarPhone = document.getElementById("navbar_phone");
function checkWindowSize() {
    if (window.innerWidth > 850) {
        navbarPhone.style.display = "none";
    } else {
        navbarPhone.style.display = "block";
    }
}
window.addEventListener("resize", checkWindowSize);
//trình quản lý navbar_phone
const navbar_pc_child = document.querySelector("#navbar_pc ul li:nth-child(3)");
const navbar_pc_menu = document.getElementById("navbar_pc_menu_item");
const navbar_pc_menu_tectyl = document.querySelector("#navbar_pc_menu_item li:nth-child(1)");
const navbar_pc_menu_item_tectyl = document.getElementById("navbar_pc_menu_item_tectyl");
const navbar_pc_menu_shl = document.querySelector("#navbar_pc_menu_item li:nth-child(2)");
const navbar_pc_menu_mobil = document.querySelector("#navbar_pc_menu_item li:nth-child(3)");
const navbar_pc_menu_item_shl = document.getElementById("navbar_pc_menu_item_shl");
const navbar_pc_menu_item_difference = document.querySelector("#navbar_pc_menu_item li:last-child");
function isHovering(elements) {
    return elements.some(element => element.matches(':hover'));
}
navbar_pc_child.addEventListener("mouseenter", () => {
    slideDownLi(navbar_pc_menu);
});
navbar_pc_child.addEventListener("mouseleave", () => {
    if (!isHovering([
        navbar_pc_child,
        navbar_pc_menu_mobil,
        navbar_pc_menu_item_difference,
        navbar_pc_menu_tectyl,
        navbar_pc_menu_item_tectyl,
        navbar_pc_menu_shl,
        navbar_pc_menu_item_shl
    ])) {
        slideUpLi(navbar_pc_menu);
        slideUpLi(navbar_pc_menu_item_tectyl);
        slideUpLi(navbar_pc_menu_item_shl);
    }
});
navbar_pc_menu.addEventListener("mouseenter", () => {
    navbar_pc_menu.style.display = "block";
});
navbar_pc_menu.addEventListener("mouseleave", () => {
    if (!isHovering([
        navbar_pc_child,
        navbar_pc_menu_mobil,
        navbar_pc_menu_item_difference,
        navbar_pc_menu_tectyl,
        navbar_pc_menu_item_tectyl,
        navbar_pc_menu_shl,
        navbar_pc_menu_item_shl
    ])) {
        slideUpLi(navbar_pc_menu);
        slideUpLi(navbar_pc_menu_item_tectyl);
        slideUpLi(navbar_pc_menu_item_shl);
    }
});
async function handleMenuChildHover(menuItem, menuChild) {
    let hoverTimeout;
    menuItem.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            slideDownLi(menuChild);
        }, 100);
    });
    menuItem.addEventListener("mouseleave", () => {
        if (!isHovering([menuItem, menuChild])) {
            slideUpLi(menuChild);
        }
    });
}
handleMenuChildHover(navbar_pc_menu_tectyl, navbar_pc_menu_item_tectyl);
handleMenuChildHover(navbar_pc_menu_shl, navbar_pc_menu_item_shl);
navbar_pc_menu_item_tectyl.addEventListener("mouseleave", () => {
    if (!isHovering([
        navbar_pc_menu_item_tectyl,
        navbar_pc_menu_tectyl,
        navbar_pc_menu_shl,
        navbar_pc_menu_item_difference,
        navbar_pc_menu_mobil
    ])) {
        slideUpLi(navbar_pc_menu_item_tectyl);
        slideUpLi(navbar_pc_menu);
    }
});
navbar_pc_menu_item_shl.addEventListener("mouseleave", () => {
    if (!isHovering([
        navbar_pc_menu_item_shl,
        navbar_pc_menu_shl,
        navbar_pc_menu_item_difference,
        navbar_pc_menu_tectyl,
        navbar_pc_menu_mobil
    ])) {
        slideUpLi(navbar_pc_menu_item_shl);
        setTimeout(() => {
            slideUpLi(navbar_pc_menu);
        }, 100);
    }
});
navbar_pc_menu_item_difference.addEventListener("mouseleave", () => {
    if (!isHovering([
        navbar_pc_menu_item_difference,
        navbar_pc_menu_tectyl,
        navbar_pc_menu_shl,
        navbar_pc_menu_mobil
    ])) {
        slideUpLi(navbar_pc_menu);
    }
});
navbar_pc_menu_tectyl.addEventListener("mouseenter", () => {
    navbar_pc_menu_item_shl.style.display = "none";
    slideDownLi(navbar_pc_menu_item_tectyl);
});
navbar_pc_menu_shl.addEventListener("mouseenter", () => {
    navbar_pc_menu_item_tectyl.style.display = "none";
    slideDownLi(navbar_pc_menu_item_shl);
});

//tự động điều chỉnh kích thước một phần tử
const item = document.querySelector("#navbar_pc ul li:nth-child(3)");
const item_relative = document.getElementById("navbar_pc_menu_item");
function adjustWidth() {
    const width_item = item.offsetWidth;
    item_relative.style.width = width_item + "px";
}
adjustWidth();
window.onresize = adjustWidth;

//quản lý sự xuất hiện của navbar_phone
function activeNavbarPhoneMenuItem(data) {
    var activeNavbar = document.getElementById(data);
    if (activeNavbar.style.display === "block") slideUpLi(activeNavbar); else slideDownLi(activeNavbar);
}
function activeNavbarPhoneMenuItemType(data, highlight) {
    var highlightElements = document.querySelectorAll(".navbar_phone_menu_item_type");
    let highlightElement;
    if (highlight === 'Tectyl') {
        highlightElement = highlightElements[0];
    } else {
        highlightElement = highlightElements[1];
    }
    var dataChange = document.getElementById(data);
    if (window.getComputedStyle(dataChange).display === "none") {
        highlightElement.classList.add("active");
        slideDownLi(dataChange);
    } else {
        highlightElement.classList.remove("active");
        slideUpLi(dataChange);
    }
}
//thực hiện call hoặc gửi email thời gian thực
document.addEventListener('DOMContentLoaded', () => {
    const callButton = document.getElementById("call_button");
    const emailButton = document.getElementById("send_email_button");
    const checkBox = document.getElementById("check_box");
    const confirmAnAction = document.getElementById("confirm_an_action");
    const confirmButton = document.getElementById("confirm");
    const cancelButton = document.getElementById("cancel");
    const startWorkHour = 8;
    const endWorkHour = 17;
    let currentAction = null;
    callButton.addEventListener('click', (event) => {
        event.preventDefault();
        const currentHour = new Date().getHours();
        if (currentHour >= startWorkHour && currentHour < endWorkHour) {
            currentAction = "call";
            checkBox.style.display = "block";
            confirmAnAction.style.display = "block";
            confirmAnAction.querySelector("p").textContent = "Bạn muốn gọi cho chúng tôi?";
        } else {
            alert("Hiện tại đang ngoài giờ làm việc. Vui lòng gửi email hoặc liên hệ vào giờ hành chính.");
        }
    });
    emailButton.addEventListener('click', (event) => {
        event.preventDefault();
        currentAction = "email";
        checkBox.style.display = "block";
        confirmAnAction.style.display = "block";
        confirmAnAction.querySelector("p").textContent = "Bạn muốn gửi email cho chúng tôi?";
    });
    confirmButton.addEventListener('click', () => {
        if (currentAction === "call") {
            window.location.href = "tel:0949238778";
        } else if (currentAction === "email") {
            window.location.href = "mailto:khoa.dktech@gmail.com";
        }
        checkBox.style.display = "none";
        confirmAnAction.style.display = "none";
    });
    cancelButton.addEventListener('click', () => {
        checkBox.style.display = "none";
        confirmAnAction.style.display = "none";
    });
});

//Kiểm tra đầy đủ thông tin form Follow
document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.querySelector('#send_email_contact form');
    const button = emailForm.querySelector('button');

    button.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = document.getElementById('follow_email').value;
        if (!email) {
            Swal.fire({
                title: 'Cảnh báo!',
                text: 'Vui lòng nhập email.',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#f0ad4e',
                timer: 3000,
            });
            return;
        }

        button.classList.add('onclic');

        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                button.classList.remove('onclic');
                button.classList.add('validate');

                setTimeout(() => {
                    button.classList.remove('validate');
                    emailForm.reset();
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Email đã được gửi thành công!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#3085d6',
                        timer: 3000,
                    });
                }, 1250);
            } else {
                throw new Error('Gửi email thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra. Vui lòng thử lại!',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
                timer: 3000,
            });
            button.classList.remove('onclic');
        }
    });
});

//ngăn hành vi chuột phải
// document.addEventListener('contextmenu', function (event) {
//     event.preventDefault(); // Ngăn không cho menu chuột phải xuất hiện
// });

//Hiệu ứng cho mũi tên
function changeArrowDirection(icon) {
    if (icon.classList.contains('right-arrow')) {
        icon.classList.remove('right-arrow');
        icon.classList.add('down-arrow');
    } else {
        icon.classList.remove('down-arrow');
        icon.classList.add('right-arrow');
    }
}


