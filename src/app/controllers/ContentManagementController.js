const ContentManagement = require("../models/ContentManagement");
const db = require("../../config/db");
const { log } = require("handlebars");

const ContentMangementController = {
  getAllMusic: (req, res) => {
    ContentManagement.getAllMusic((err, songmanagement) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }
      ContentManagement.getArtist((err, artist) => {
        if (err) {
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
          return;
        }
        ContentManagement.getAlbum((err, album) => {
          if (err) {
            res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
            return;
          }
          res.render("songmanagement", { songmanagement, artist, album });
        });
      });
    });
  },

  addNewSong(req, res, next) {
    const formData = req.body;
    const insertSongQuery =
      "INSERT INTO songs (Name, Image, Lyric, Link, Time, AlbumID, NumberListens, status_song) VALUES (?, '/img/Rectangle 33.png', ?, ?, ?, ?, 0, 0)";

    const artistSongQuery =
      "INSERT INTO artistssong (ArtistID, SongID) VALUES (?, ?)";

    db.query(
      insertSongQuery,
      [
        formData.Name,
        formData.Lyric,
        formData.Link,
        formData.Time,
        formData.AlbumID,
      ],
      (err, result) => {
        if (err) {
          console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", err);
          res.status(500).send("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu");
        } else {
          const newSongID = result.insertId;
          db.query(artistSongQuery, [formData.ArtistID, newSongID], (err) => {
            if (err) {
              console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", err);
              res.status(500).send("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu");
            } else {
              res.redirect("/login/admin/songmanagement");
            }
          });
        }
      }
    );
  },

  editSong(req, res, next) {
    const songId = req.params.SongID;
    ContentManagement.getSongById(songId, (err, songdetail) => {
      if (err) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu MySQL:", err);
        res.status(500).send("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu");
        return;
      }
      ContentManagement.getAlbum((err, album) => {
        if (err) {
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
          return;
        }
        res.render("editsong", { songdetail, album });
      });
    });
  },

  updateSong(req, res, next) {
    const SongID = req.params.SongID;
    const Name = req.body.Name;
    const Lyric = req.body.Lyric;
    const Link = req.body.Link;
    const Time = req.body.Time;
    s;
    let errorMessage = "";

    // Kiểm tra các trường có giá trị không rỗng trước khi thực hiện câu truy vấn
    if (!Name || !Lyric || !Link || !Time) {
      errorMessage = "Một hoặc nhiều trường bị trống.";
    } else {
      const query =
        "UPDATE songs SET Name = ?, Lyric = ?, Link = ?, Time = ? WHERE SongID = ?";
      const values = [Name, Lyric, Link, Time, SongID];

      db.query(query, values, (err, results) => {
        if (err) {
          console.error(
            "Lỗi khi cập nhật dữ liệu vào cơ sở dữ liệu MySQL:",
            err
          );
          next(err);
        } else {
          res.redirect("/login/admin/songmanagement");
        }
      });
    }
  },

  deleteSong(req, res, next) {
    const SongID = req.params.SongID;
    const query = "DELETE FROM songs WHERE SongID = ?";
    db.query(query, [SongID], (err, results) => {
      if (err) {
        console.error("Lỗi khi xóa người dùng trong cơ sở dữ liệu MySQL:", err);
        next(err);
      } else {
        res.redirect("/login/admin/songmanagement");
      }
    });
  },

  searchSongByName(req, res) {
    const searchSong = req.body.Name;
    //  Kiểm tra xem searchName có giá trị hay không
    if (!searchSong) {
      // Nếu không có searchName, trả về tất cả User
      const query = "SELECT * FROM songs";
      db.query(query, (err, songmanagement) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res
            .status(500)
            .json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        res.render("songmanagement", { songmanagement });
      });
    } else {
      // Nếu có searchName, thực hiện tìm kiếm như trong câu truy vấn trước
      const query = "SELECT * FROM songs WHERE Name LIKE ?";
      const searchValue = `%${searchSong}%`;

      db.query(query, [searchValue], (err, songmanagement) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res
            .status(500)
            .json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        res.render("songmanagement", { songmanagement });
      });
    }
  },

  //chức năng playlist
};

module.exports = ContentMangementController;
