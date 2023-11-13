const db = require('../../config/db'); // Điều này đảm bảo sử dụng kết nối cơ sở dữ liệu đã tạo

const Favouritesong = {
    getAll: (callback) => {
        db.query('SELECT songs.SongID AS song_id, songs.Image AS song_img, songs.Time AS song_time, songs.name AS song_name, songs.NumberListens AS song_NumberListen ,artists.name AS artist_name FROM songs INNER JOIN artistssong ON songs.songID = artistssong.songID INNER JOIN artists ON artistssong.artistID = artists.artistID', callback);
    },
    // Các phương thức khác cho model
};

module.exports = Favouritesong;