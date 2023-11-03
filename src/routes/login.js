const express = require('express')
const router = express.Router()
const loginController = require('../app/controllers/LoginController')



router.get('/', (req, res) => {
    // Render trang đăng nhập mà không sử dụng layout và các partials
    res.render('login', {
        layout: false, // Không sử dụng layout
    });
});
// router.post('/', (req, res) => {
//     // Render trang đăng nhập mà không sử dụng layout và các partials
//     res.render('login', {
//         layout: false, // Không sử dụng layout
//     });
// });

router.post('/', loginController.loginuser)
router.get('/admin')




module.exports = router;