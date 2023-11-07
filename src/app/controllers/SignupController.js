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

        if (!user || !password || !birth || !username || password != Retype) {
            // Hiển thị thông báo lỗi khi không nhập email hoặc password
            const errorMessage = 'Vui lòng nhập lại thông tin của bạn.';
            res.render('signup', {
                layout: false,
                errorMessage: errorMessage
            });
        } else {
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