const Artist = require('../models/Artist');
const ArtistSong = require('../models/ArtistSong');

const ArtistController = {
  getAllArtist: (req, res) => {
    Artist.getAll((err, artist) => {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.render('artist', { artist });
      }
    });
  },
  getAllArtistSong: (req, res) => {
    ArtistSong.getAll((err, artistsong) => {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.render('artistsong', { artistsong });
      }
    });
  },
};

module.exports = ArtistController;
