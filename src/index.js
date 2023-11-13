
const express = require('express')
const morgan = require('morgan')
const route = require('./routes')
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('./config/db')
const fs = require('fs');
const csv = require('csv-parser');
const SpotifyWebApi = require('spotify-web-api-node');
// const { Howl, Howler } = require('howler');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


const songs = [];
const app = express()
const port = 3000

const spotifyApi = new SpotifyWebApi({
  clientId: 'fb45c46babdf44e3b55bf6b9bd4f7aa6',
  clientSecret: '2afd65a34cf8490b9e4d5054f5100954',
});


// Đăng nhập vào Spotify
spotifyApi.clientCredentialsGrant()
  .then(data => {
    console.log('Đã đăng nhập vào Spotify!');
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Lỗi đăng nhập:', error);
  });

// Tạo các route để lấy dữ liệu từ Spotify API
// app.get('/search', (req, res) => {
//   const query = req.query.query; // từ khóa tìm kiếm  
//   spotifyApi.searchTracks(query)
//     .then(data => {
//       //const firstTrack = data.body.tracks.items[0];
//       res.render('searchresult', { tracks: data.body.tracks.items });
//       // res.json(data.body.tracks.items)
//     })
//     .catch(error => {
//       res.status(400).json({ error: 'Lỗi tìm kiếm.' });
//     });


// });

// app.get('/track/:id', (req, res) => {
//   const trackId = req.params.id; // ID của bài hát
//   spotifyApi.getTrack(trackId)
//     .then(data => {
//       // res.json(data.body);
//       res.render('searchresult', {})
//     })
//     .catch(error => {
//       res.status(400).json({ error: 'Lỗi lấy thông tin bài hátt.' });
//     });
// });

// // Get music list from csv file
// const songs = [];
// fs.createReadStream('D:/play-music-final/Music_Recommender_System/spotify_millsongdata.csv')
//   .pipe(csv())
//   .on("data", (row) => {
//     songs.push(row);
//   })
//   .on("end", () => {
//     console.log("CSV file successfully processed.");
//   });

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// }));


// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true
// }));

// // Cấu hình Passport.js
// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     // Kiểm tra đăng nhập và gọi done(err, user) để xác định xem đăng nhập có thành công hay không
//   }
// ));

// passport.serializeUser((user, done) => {
//   // Lưu thông tin người dùng vào session
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   // Truy vấn thông tin người dùng từ cơ sở dữ liệu và gọi done(err, user) để lấy thông tin người dùng
// });

// // Sử dụng Passport.js trong ứng dụng Express
// app.use(passport.initialize());
// app.use(passport.session());


// Get music list from csv file
fs.createReadStream('D:/code-workspace/vscode/play-music-final/Music_Recommender_System/spotify_millsongdata.csv')

  .pipe(csv())
  .on('data', (row) => {
    songs.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });

// Endpoint để xử lý tìm kiếm bài hát
// app.get('/search', (req, res) => {
//   const searchTerm = req.query.query;

//   if (!searchTerm) {
//     return res.status(400).send('Please provide a search term.');
//   }

//   // Tìm kiếm trong mảng songs
//   const searchResults = songs.filter(song => {
//     return (
//       song.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       song.artist.toLowerCase().includes(searchTerm.toLowerCase()) // Kiểm tra tồn tại trường title trước khi sử dụng includes
//     );
//   });
//   res.render('searchresult', { searchResults })
//   //res.json(searchResults); // Trả về kết quả tìm kiếm dưới dạng JSON
// });

app.get('/play/:songName', (req, res) => {
  const songName = req.params.songName;
  // Trả về file nhạc theo tên
  res.sendFile(__dirname + `/public/music/${songName}.mp3`);
});

// Định nghĩa route để phát nhạc
app.get('/play/:songName', (req, res) => {
  const songName = req.params.songName;
  // Trả về file nhạc theo tên
  res.sendFile(__dirname + `/public/music/${songName}.mp3`);

});


//Kiểm tra connect to db
db.connection;

//Set static file
app.use(express.static(path.join(__dirname, "public")));

// Midleware xử lý dữ liệu từ form sublit lên

app.use(express.urlencoded({
  extended: true //npm body parser
}))

app.use(express.json());

//HTTP logger
app.use(morgan("combined"));

//Template engine

app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
  }

}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))


// Route init
route(app);

app.listen(port, () => {

  console.log(`App listening on port http://localhost:${port}`)
})


