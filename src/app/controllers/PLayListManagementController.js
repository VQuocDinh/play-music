const PlayListMangement = require("../models/PlayListManagement");
const db = require("../../config/db");
const { log } = require("handlebars");

const PlayListManagementController = {
  getAllPlayList: (req, res) => {
    PlayListMangement.getAllPlayList((err, playlistmanagement) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      } else {
        res.render("playlistmanagement", { playlistmanagement });
      }
    });
  },

  addPlayList(req, res, next) {
    const formData = req.body;

    const query =
      "INSERT INTO playlist (Name, Image, Description ) VALUES (?, '/img/Rectangle 5.png', ?)";
    const values = [formData.Name, formData.Description];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", err);
        res.status(500).send("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu");
      } else {
        res.redirect("/login/admin/playlistmanagement");
      }
    });
  },

  playlistsong(req, res, next) {
    const PlaylistID = req.params.PlaylistID;
    PlayListMangement.getAllPlaylistSong(PlaylistID, (err, playlistsong) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }
      PlayListMangement.getPlaylistbyId(PlaylistID, (err, playlistById) => {
        if (err) {
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        res.render("playlistsongmanagement", { playlistsong, playlistById });
      });
    });
  },

  searchPlayListByName(req, res) {
    const searchPlayList = req.body.Name;
    //  Kiểm tra xem searchName có giá trị hay không
    if (!searchPlayList) {
      // Nếu không có searchName, trả về tất cả User
      const query = "SELECT * FROM playlist";
      db.query(query, (err, playlistmanagement) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res
            .status(500)
            .json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        res.render("playlistmanagement", { playlistmanagement });
      });
    } else {
      // Nếu có searchName, thực hiện tìm kiếm như trong câu truy vấn trước
      const query = "SELECT * FROM playlist WHERE Name LIKE ?";
      const searchValue = `%${searchPlayList}%`;

      db.query(query, [searchValue], (err, playlistmanagement) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res
            .status(500)
            .json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        res.render("playlistmanagement", { playlistmanagement });
      });
    }
  },
};

module.exports = PlayListManagementController;
