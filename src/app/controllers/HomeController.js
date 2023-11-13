const Home = require("../models/Home");
const Playlist = require("../models/Playlist");
const Artist = require("../models/Artist");
const Topchart = require("../models/Songs");
const db = require("../../config/db");

const songData = [];

const HomeController = {

  index(req, res) {

    const data = {
      username: "user",
      image: "/img/userlogo.png",
      playlists: playlists,
      artists: artists,
      topchart: topchart,
    };
    res.render('home', { data })
  },

  addPlaylist: (req, res) => {
    const playlistName = req.body.name
    Playlist.add(playlistName, err => {
      if (err) {
        res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      } else {
        res.redirect('/');
      }
    })
  },

  getHomePage(req, res) {
    Playlist.getAll((errPlaylist, playlists) => {
      if (errPlaylist) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách phát' });
        return;
      }

      Artist.getAll((errArtist, artists) => {
        if (errArtist) {
          res.status(500).json({ error: 'Lỗi khi lấy thông tin nghệ sĩ' });
          return;
        }

        Topchart.getBySort((errTopchart, topchart) => {
          if (errTopchart) {
            s
            res.status(500).json({ error: 'Lỗi khi lấy thông tin bảng xếp hạng' });
            return;
          }


          const data = {
            username: "user",
            playlists: playlists.slice(0,5),
            artists: artists.slice(0,5),
            topchart: topchart.slice(0,5),
          };

          res.render('home', { data, songData: songData.slice(0,5), playlists })
        });
      });
    });
  },

  madeforyou(req, res) {
    res.render('madeforyou', { songData })
  },

  search(req, res) {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      const data = {
        username: "user",

        playlists: playlists,
        artists: artists,
        topchart: topchart,
      };

      res.render('home', { data })
    }

    Home.search(searchQuery, (err, searchResults) => {
      if (err) {
        return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      }

      Topchart.getBySort((errTopchart, topchart) => {
        if (errTopchart) {
          res
            .status(500)
            .json({ error: "Lỗi khi lấy thông tin bảng xếp hạng" });
          return;
        }

        res.render("home", { playlists, artists, topchart, songData });
      });
    });
  },


  searchSong(req, res) {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.render("home");
    }

    Home.search(searchQuery, (err, searchResults) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      }

      if (searchResults.length === 0) {
        return res.render("noresults");
      }

      res.render("searchresult", { searchresults: searchResults });
    });
  },

  receiveData(req, res) {
    const { recommended_music_names, recommended_music_posters } = req.body;

    songData.length = 0;

    for (let i = 0; i < recommended_music_names.length; i++) {
      songData.push({
        song_name: recommended_music_names[i],
        img_path: recommended_music_posters[i],
      });
    }

    res.send("Dữ liệu đã được nhận và lưu tạm thời");
  },

  addSongToPlayList(req, res, next) {
    const SongID = req.params.SongID;
    const PlayListID = req.params.PlayListID;
    const values = [SongID, PlayListID];
    const query = "INSERT INTO playlistsong (SongID,PlayListID) VALUES (?, ?)";
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:", err);
        res.status(500).send("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu");
      } else {
        res.redirect("/");
      }
    });
  },
};

module.exports = HomeController;


