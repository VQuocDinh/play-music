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
        errorMessage: errorMessage,
      });
    } else if (!isValidEmail(user)) {
      const errorMessage = 'Email không hợp lệ!';
      return res.status(400).render('signup', {
        layout: false,
        errorMessage: errorMessage,
      });
    } else if (password !== Retype) {
      const errorMessage = 'Mật khẩu nhập lại không chính xác!';
      return res.status(400).render('signup', {
        layout: false,
        errorMessage: errorMessage,
      });
    }

    // Kiểm tra xác thực email và thực hiện đăng ký
    User.getUserByEmail(user, (error, results) => {
      if (results === null || results.length === 0) {
        const saltRounds = 10; // Số lượt lấy muối (càng cao càng an toàn, nhưng cũng càng chậm)

        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
          }

          bcrypt.hash(password, salt, (err, encryptedPassword) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Internal Server Error');
            }

            User.addUser(user, encryptedPassword, birth, username, (err, result) => {
              if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
              } else {
                const successMessage = 'Đăng ký thành công';
                return res.render('signup', {
                  layout: false,
                  Message: successMessage,
                });
              }
            });
          });
        });
      } else {
        const errorMessage = 'Email này đã được đăng ký!';
        return res.status(400).render('signup', {
          layout: false,
          errorMessage: errorMessage,
        });
      }
    });
  }
}

module.exports = SignupController;
