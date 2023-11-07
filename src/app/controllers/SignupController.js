
const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt');

class SignupController {
    static signupuser(req, res) {
        const user = req.body.email;
        const password = req.body.password;
        const birth = req.body.birth;
        const username = req.body.username;
        const Retype = req.body.Retype;

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!user || !password || !birth || !username) {
            const errorMessage = 'Vui lòng nhập đầy đủ thông tin đăng ký!';
            return res.status(400).render('signup', {
                layout: false,
                errorMessage: errorMessage
            });
        } else if (!isValidEmail(user)) {
            const errorMessage = 'Email không hợp lệ!';
            return res.status(400).render('signup', {
                layout: false,
                errorMessage: errorMessage
            });
        } else if (password !== Retype) {
            const errorMessage = 'Mật khẩu nhập lại không chính xác!';
            return res.status(400).render('signup', {

        if (!user || !password || !birth || !username || password != Retype) {
            // Hiển thị thông báo lỗi khi không nhập email hoặc password
            const errorMessage = 'Vui lòng nhập lại thông tin của bạn.';
            res.render('signup', {
                layout: false,
                errorMessage: errorMessage
            });
        } else {
            User.getUserByUsername(user, (error, results) => {
                if (results === "" || !results) {
                   
                    
                    User.addUser(user, password, birth, username, (err, result) => {
                        if (err) {
                            // Handle the error, for example:
                            return res.status(500).send('Internal Server Error');
                        } else {
                            const successMessage = 'Đăng ký thành công';
                            return res.render('signup', {
                                layout: false,
                                Message: successMessage
                            });
                        }
                    });
                } else {
                    const errorMessage = 'Email này đã được đăng ký!';
                    return res.status(400).render('signup', {
                        layout: false,
                        errorMessage: errorMessage
                    });
            // Tạo một salt
            const saltRounds = 10; // Số lượt lấy muối (càng cao càng an toàn, nhưng cũng càng chậm)
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    return console.error(err);
                }
                bcrypt.hash(password, salt, (err, encryptedPassword) => {
                    if (err) {
                        return console.error(err);
                    }

                    // 'encryptedPassword' là mật khẩu đã được mã hóa
                    User.addUser(user, encryptedPassword, birth, username, (err, result) => {
                        if (err) {
                            res.render('signup', { message: 'colo:red' });
                        } else {
                            res.redirect('/login');
                        }
                    });
                });
            });
        }
    }
}

module.exports = SignupController;