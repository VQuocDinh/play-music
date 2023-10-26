const express = require('express')
const router = express.Router()
const loginController = require('../app/controllers/LoginController')


router.get('/admin', (req, res) => {
    res.render('admin', {
        layout: false, 
    });
});

router.get('/user', (req, res) => {
    res.render('user', {
        layout: false, 
    });
});

router.get('/', (req, res) => {
    // Render trang đăng nhập mà không sử dụng layout và các partials
    res.render('login', {
        layout: false, // Không sử dụng layout
    });
});


module.exports = router;