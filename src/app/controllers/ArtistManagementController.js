const ArtistManagement = require("../models/ArtistManagement.js");
const db = require("../../config/db");
const { log } = require("handlebars");

const ArtistManagementController = {
  getAllArtist: (req, res) => {
    ArtistManagement.getAllArtist((err, artistmanagement) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      } else {
        res.render("artistmanagement", { artistmanagement });
      }
    });
  },

  addArtist(req, res, next) {
    const formData = req.body;

    const query =
      "INSERT INTO artists (Name, Country, Image) VALUES (? , ?,'/img/Rectangle 5.png')";
    const values = [formData.Name, formData.Country];
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", err);
        res.status(500).send("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu");
      } else {
        res.redirect("/login/admin/artistmanagement");
      }
    });
  },

  artistSong(req, res, next) {
    const ArtistID = req.params.ArtistID;

    ArtistManagement.getAllArtistSong(ArtistID, (err, artistsong) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }
      ArtistManagement.getArtistById(ArtistID, (err, artistById) => {
        if (err) {
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        }
        res.render("artistsongmanagement", { artistsong, artistById });
      });
    });
  },

  searchArtistByName(req, res) {
    const searchArtist = req.body.Name;
    //  Kiểm tra xem searchName có giá trị hay không
    if (!searchArtist) {
      // Nếu không có searchName, trả về tất cả User
      const query = "SELECT * FROM artists";
      db.query(query, (err, artistmanagement) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res
            .status(500)
            .json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        res.render("artistmanagement", { artistmanagement });
      });
    } else {
      // Nếu có searchName, thực hiện tìm kiếm như trong câu truy vấn trước
      const query = "SELECT * FROM artists WHERE Name LIKE ?";
      const searchValue = `%${searchArtist}%`;

      db.query(query, [searchValue], (err, artistmanagement) => {
        if (err) {
          console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
          return res
            .status(500)
            .json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
        }
        res.render("artistmanagement", { artistmanagement });
      });
    }
  },
};

module.exports = ArtistManagementController;
