require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors'); // Cần khai báo cors ở đầu

const app = express(); // Đảm bảo khai báo app trước khi sử dụng

// Sử dụng cors
app.use(cors());

// Thiết lập API Key cho SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = 3000;

// Middleware để xử lý dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Xử lý POST request từ form
app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Nếu chỉ có email
    if (email && !name && !phone && !message) {
        const msg = {
            to: 'nguyenhaphuongthai.dev@gmail.com',
            from: 'nguyenhaphuongthai.dev@gmail.com',
            subject: 'Email đăng ký nhận tin',
            html: `<p>Email: ${email}</p>`,
        };

        try {
            await sgMail.send(msg);
            res.status(200).send('Email đã được gửi thành công!');
        } catch (error) {
            console.error('Lỗi gửi email:', error.response ? error.response.body : error.message);
            res.status(500).send('Gửi email thất bại.');
        }
    }
    // Nếu có đầy đủ thông tin
    else if (name && email && phone && message) {
        const msg = {
            to: 'nguyenhaphuongthai.dev@gmail.com',
            from: 'nguyenhaphuongthai.dev@gmail.com',
            subject: 'Thông tin liên hệ từ website',
            html: `
                <h3>Thông tin từ form:</h3>
                <p><strong>Họ và tên:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Số điện thoại:</strong> ${phone}</p>
                <p><strong>Nội dung:</strong> ${message}</p>
            `,
        };

        try {
            await sgMail.send(msg);
            res.status(200).send('Email đã được gửi thành công!');
        } catch (error) {
            console.error('Lỗi gửi email:', error.response ? error.response.body : error.message);
            res.status(500).send('Gửi email thất bại.');
        }
    } else {
        res.status(400).send('Vui lòng điền đầy đủ thông tin.');
    }
});

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
