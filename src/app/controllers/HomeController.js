const Home = require('../models/Home');
const Playlist = require('../models/Playlist');
const Artist = require('../models/Artist');
const Topchart = require('../models/Songs');

const songData = [];


const HomeController = {
    index(req, res) {
        res.render('home')
    getHomePage: (req, res) => {
        Playlist.getAll((err, playlists) => {
            if (err) {
                res.status(500).json({ error: 'Lỗi khi lấy danh sách phát' });
                return;
            }

            Artist.getAll((err, artists) => {
                if (err) {
                    res.status(500).json({ error: 'Lỗi khi lấy thông tin nghệ sĩ' });
                    return;
                }

                Topchart.getBySort((err, topchart) => {
                    if (err) {
                        res.status(500).json({ error: 'Lỗi khi lấy thông tin nghệ sĩ' });
                        return;
                    }

                    res.render('home', { playlists, artists, topchart, songData });
                });

            });
        });
    },

    search(req, res) {
        Home.search(req.query.query, (err, searchresults) => {
            if (err) {
                res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
            } else if (!(req.query.query)) {
                res.render('home');
            } else {
                res.render('searchresult', { searchresults });
            }
        });
    },

    receiveData(req, res) {
        const { recommended_music_names, recommended_music_posters } = req.body;

        console.log(recommended_music_names);
        console.log(recommended_music_posters);

        // Xóa dữ liệu cũ
        songData.length = 0;

        // Thêm dữ liệu mới vào mảng
        for (let i = 0; i < recommended_music_names.length; i++) {
            songData.push({
                song_name: recommended_music_names[i],
                img_path: recommended_music_posters[i]
            });
        }

        res.send('Data received and stored temporarily');
    }
}

module.exports = HomeController;