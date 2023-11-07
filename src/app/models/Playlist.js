const db = require("../../config/db"); // Điều này đảm bảo sử dụng kết nối cơ sở dữ liệu đã tạo

const Playlist = {
  getAll: (callback) => {
    db.query("SELECT * FROM playlist", callback);
  },

  getById(id, callback) {
    const query = "SELECT * FROM `playlist` WHERE playlist.PlaylistID = ?;";
    db.query(query, [id], callback);
  },

  getAllPlaylistSong(id, callback) {
    const query = "SELECT songs.SongID AS song_id, songs.Name AS song_name, artists.Name AS artist_name, songs.Image AS song_img, playlist.Image AS playlist_img, playlist.Name AS playlist_name, playlist.Description AS playlist_desc, playlist.PlaylistID AS playlist_id FROM songs INNER JOIN playlistsong ON songs.SongID = playlistsong.SongID INNER JOIN playlist ON playlistsong.PlaylistID = playlist.PlaylistID INNER JOIN artistssong ON songs.SongID = artistssong.SongID INNER JOIN artists ON artistssong.ArtistID = artists.ArtistID WHERE playlist.PlaylistID = ?;";
    // Truyền tham số vào mảng
    db.query(query, [id], callback);
  },

  add: (playlistName,callback) => {
    const query = "INSERT INTO playlist(Name, Image) VALUES(?,'https://mosaic.scdn.co/640/ab67616d00001e026e2cbef9f0ce540e4a0002ffab67616d00001e02c03ba683611bb79c2e1bffe5ab67616d00001e02ca2b592b428d3bdbfb5caa68ab67616d00001e02da52f76569645d6ec27029a1')"
    db.query(query, [playlistName], callback);


  },

};

module.exports = Playlist;
