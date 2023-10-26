const db = require('../../config/db');  // Điều này đảm bảo sử dụng kết nối cơ sở dữ liệu đã tạo

const PlaylistSong = {
  getAll: (callback) => {
    db.query('SELECT * FROM playlistsong', callback);
  },
  // Các phương thức khác cho model
};

module.exports = PlaylistSong;
