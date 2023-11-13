const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt');

class SignupController {
    static showSignupForm(req, res) {
        res.render('signup');
    }

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
            // Hiển thị thông báo lỗi khi không nhập đủ thông tin đăng ký
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
            const errorMessage = 'Mật khẩu nhập lại không khớp!';
            return res.status(400).render('signup', {
                layout: false,
                errorMessage: errorMessage
            });
        } else {
            User.getUserByUsername(user, (err, result) => {
                if (err) {
                    // Xử lý lỗi, ví dụ:
                    return res.status(500).send('Internal Server Error');
                }
                if (result) {
                    const errorMessage = 'Email này đã được đăng ký!';
                    return res.status(400).render('signup', {
                        layout: false,
                        errorMessage: errorMessage
                    });
                }
                // Mật khẩu hóa bằng bcrypt
                const saltRounds = 1;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        return res.status(500).send('Internal Server Error');
                    }
                    bcrypt.hash(password, salt, (err, hashedPassword) => {
                        if (err) {
                            return res.status(500).send('Internal Server Error');
                        }
                        User.addUser(user, hashedPassword, birth, username, (err, result) => {
                            if (err) {
                                return res.status(500).send('Internal Server Error');
                            }
                            const successMessage = 'Đăng ký thành công';
                            return res.render('signup', {
                                layout: false,
                                Message: successMessage
                            });
                        });
                    });
                });
            });
        }
    }
}

module.exports = SignupController;