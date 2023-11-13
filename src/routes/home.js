
const db = require('../config/db'); // Điều này đảm bảo sử dụng kết nối cơ sở dữ liệu đã tạo
const express = require('express')
const router = express.Router()
const homeController = require('../app/controllers/HomeController')
const loginController = require('../app/controllers/LoginController')

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next(); // Nếu người dùng đã đăng nhập, tiếp tục xử lý yêu cầu
//     }
//     // Nếu người dùng chưa đăng nhập, điều hướng họ đến trang đăng nhập hoặc trang khác
//     res.redirect('/login'); // Điều hướng đến trang đăng nhập
//   }
  

router.get('/play/:songName', homeController.index)
router.post('/receive_data', homeController.receiveData)
router.get('/search', homeController.searchSong)
router.get('/madeforyou', homeController.madeforyou)
router.post('/addPlaylist', homeController.addPlaylist)
router.get('/', homeController.getHomePage)
router.post('/', loginController.loginuser)

router.post("/:SongID/:PlayListID", homeController.addSongToPlayList);
module.exports = router;
