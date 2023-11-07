const AlbumManagement = require("../models/AlbumManagement");
const db = require("../../config/db");
const { log } = require("handlebars");

const AlbumManagementController = {
  getAllAlbum: (req, res) => {
    AlbumManagement.getAllAlbum((err, albummanagement) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }
      AlbumManagement.getArtist((err, artist) => {
        if (err) {
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        res.render("albummanagement", { albummanagement, artist });
      });
    });
  },

  addAlbum(req, res, next) {
    const formData = req.body;
    const query =
      "INSERT INTO album (Name, Image, ArtistID) VALUES (? , '/img/Rectangle 5.png', ?)";
    const values = [formData.Name, formData.ArtistID];
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", err);
        res.status(500).send("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu");
      } else {
        res.redirect("/login/admin/albummanagement");
      }
    });
  },

  albumsong(req, res, next) {
    const AlbumID = req.params.AlbumID;
    AlbumManagement.getAllAblumSong(AlbumID, (err, albumsong) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }
      AlbumManagement.getAlbumbyId(AlbumID, (err, albumById) => {
        if (err) {
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        res.render("albumsongmanagement", { albumsong, albumById });
      });
    });
  },

  searchAlbumByName(req, res) {
    const searchAlbum = req.body.Name;

    //  Kiểm tra xem searchName có giá trị hay không
    if (!searchAlbum) {
      // Nếu không có searchName, trả về tất cả User
      AlbumManagement.getAllAlbum((err, albummanagement) => {
        if (err) {
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
          return;
        }
        res.render("albummanagement", { albummanagement });
      });
    } else {
      // Nếu có searchName, thực hiện tìm kiếm như trong câu truy vấn trước
      const query =
        "SELECT album.AlbumID AS album_ID, album.Name AS album_name, album.Image AS album_img, album.NumberOfSong AS album_NumberOfSong, artists.Name AS artist_name, artists.ArtistID AS artist_ID FROM album INNER JOIN artists ON album.ArtistID = artists.ArtistID WHERE album.Name LIKE ?";
      const searchValue = `%${searchAlbum}%`;

      db.query(query, [searchValue], (err, albummanagement) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res
            .status(500)
            .json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        res.render("albummanagement", { albummanagement });
      });
    }
  },
};

module.exports = AlbumManagementController;
