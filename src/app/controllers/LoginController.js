const User = require("../models/User");
const bcrypt = require('bcrypt');
const Home = require('../models/Home');
const Playlist = require('../models/Playlist');
const Artist = require('../models/Artist');
const Topchart = require('../models/Songs');
const { statistics } = require("./config/db");

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
                if (error || results == "" || !results) {
                    const errorMessage = 'Tài khoản hoặc mật khẩu không đúng. Vui lòng nhập lại!';
                    res.render('login', {
                        layout: false,
                        errorMessage: errorMessage,
                    });
                } else {
                    // So sánh mật khẩu đã băm với mật khẩu nhập
                    bcrypt.compare(password, results.Password, (err, isMatch) => {
                        if (err) {
                            res.json(isMatch)
                        }

                        if (isMatch) {
                            if (results.Role.toString('hex') === "00") {
                                res.redirect('/login/admin');
                            } else {
                                Playlist.getAll((errPlaylist, playlists) => {
                                    if (errPlaylist) {
                                        res.status(500).json({ error: 'Lỗi khi lấy danh sách phát' });
                                        return;
                                    }

                                    Artist.getAll((errArtist, artists) => {
                                        if (errArtist) {
                                            res.status(500).json({ error: 'Lỗi khi lấy thông tin nghệ sĩ' });
                                            return;
                                        }

                                        Topchart.getBySort((errTopchart, topchart) => {
                                            if (errTopchart) {
                                                res.status(500).json({ error: 'Lỗi khi lấy thông tin bảng xếp hạng' });
                                                return;
                                            }
                                            const data = {
                                                username: results.UserName,
                                                iduser: results.UserID,
                                                image: results.Image,
                                                playlists: playlists,
                                                artists: artists,
                                                topchart: topchart,
                                            };

                                            res.render('home', { data });
                                        });
                                    });
                                });
                            }
                        } else {
                            const errorMessage = 'Mật khẩu không chính xác. Vui lòng mật lại !.';
                            res.render('login', {
                                layout: false,
                                errorMessage: errorMessage,
                            });
                            // res.json(isMatch)


                        }
                    });
                }
            });
        }
    }
}

module.exports = loginController;