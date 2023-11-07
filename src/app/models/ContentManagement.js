const db = require("../../config/db"); // Điều này đảm bảo sử dụng kết nối cơ sở dữ liệu đã tạo

const ContentManagement = {
  getAllMusic: (callback) => {
    db.query("SELECT * FROM songs", callback);
  },

  getSongById: (SongID, callback) => {
    db.query("SELECT * FROM songs WHERE SongID = ?", [SongID], callback);
  },
  getArtist: (callback) => {
    db.query("SELECT * FROM artists", callback);
  },
  getAlbum: (callback) => {
    db.query("SELECT * FROM album", callback);
  },
  // Các phương thức khác cho model
};

module.exports = ContentManagement;
