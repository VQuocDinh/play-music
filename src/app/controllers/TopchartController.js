// const Song = require("../models/Songs");
const Song = require('../models/Makeforyou');


const TopchartController = {

  // getAllSongs: (req, res) => {
  //   Song.getAll((err, songs) => {
  //     if (err) {
  //       res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
  //     } else {
  //       res.render("topchart", { songs });
  //       // res.json(songs)
  //     }
  //   });
  // },

  getAllSongs: (req, res) => {
    Song.getAllSongs((err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
       res.render('topchart',{result})
      // res.json(result)
    });
  },
  // Các hàm xử lý khác cho controller
};

module.exports = TopchartController;
