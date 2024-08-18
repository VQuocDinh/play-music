const User = require("../models/User");

class loginController {
    static showLoginForm(req, res) {
        res.render('login');
    }

    static loginuser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            // Hiển thị thông báo lỗi khi không nhập email hoặc password
            const errorMessage = 'Vui lòng nhập tài khoản và mật khẩu !';
            res.render('login', {
                layout: false,
                errorMessage: errorMessage
            });
        } else {
            User.getUserByUsername(email, (error, results) => {
                if (error || results=="" || !results ) {
                    const errorMessage = 'Tài khoản hoặc mật khẩu không đúng. Vui lòng nhập lại!';
                    // Xử lý khi thông tin đăng nhập không hợp lệ
                    res.render('login', {
                        layout: false,
                        errorMessage: errorMessage,
                    });
                    // res.json(results)
                    return;
                } 
                else if(results.Password!=password){
                    const errorMessage = 'Mật khẩu không chính xác. Vui lòng mật lại !.';
                    // Xử lý khi thông tin đăng nhập không hợp lệ
                    res.render('login', {
                        layout: false,
                        errorMessage: errorMessage,
                    });
                    // res.json(results.Password)
                    return;
                }
                else {
                    if (results.Role.toString('hex') === "00") {
                        res.redirect('/login/admin');
                    } else {
                        res.redirect('/');
                    }
                }
            });
        }
    }
}










module.exports = loginController