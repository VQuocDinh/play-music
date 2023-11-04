// const express = require("express");
// const morgan = require("morgan");
// const route = require("./routes");
// const handlebars = require("express-handlebars");
// const path = require("path");
// const db = require("./config/db");

// const app = express();
// const port = 3000;
// app.use(express.static("public"));

const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const exphbs = require("express-handlebars");
const path = require("path");
const db = require("./config/db");
// const bodyParser = require('body-parser')
const fs = require("fs");
const csv = require("csv-parser");
// const { Console } = require('console')
// const axios = require('axios');
const app = express();
const port = 3000;

// const http = require('http');
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

// app.post('/search-song', (req, res) => {
//   const songName = req.body.songName; // Lấy tên bài hát từ request body
//   // Gửi tên bài hát đến hệ thống đề xuất viết bằng Python thông qua một API hoặc giao thức HTTP
//   // Sử dụng các thư viện như 'axios' để gửi yêu cầu đến Python server
//   // Ví dụ:
//   axios.post('http://localhost:8501/get-recommendations', { songName })
//     .then(response => {
//       const recommendations = response.data;
//       res.json(recommendations); // Trả về kết quả đề xuất cho người dùng
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'Đã xảy ra lỗi khi gửi yêu cầu đến hệ thống đề xuất' });
//     });
// });

// Endpoint để nhận yêu cầu tìm kiếm bài hát
// app.post('/search-song', (req, res) => {
//   const songName = req.body.songName; // Tên bài hát được gửi từ form

//   // Gửi yêu cầu tới hệ thống đề xuất viết bằng Python
//   axios.post('http://localhost:8501/predict', { songName })
//       .then(response => {
//           // Xử lý dữ liệu trả về từ hệ thống đề xuất
//           const recommendedSongs = response.data;
//           res.send(recommendedSongs);
//       })
//       .catch(error => {
//           res.status(500).send("Đã xảy ra lỗi khi gửi yêu cầu đến hệ thống đề xuất.");
//       });
// });

// app.post('/search', async (req, res) => {
//   const data = JSON.stringify(req.body); // Chuyển object thành chuỗi JSON
//   console.log(data); // Kiểm tra kiểu dữ liệu của data, hiện tại đang là object

//   const options = {
//     hostname: 'localhost',
//     port: 8501,
//     path: '/receiveData',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': data.length,
//     },
//   };

//   const pythonReq = http.request(options, pythonRes => {
//     let responseData = '';

//     pythonRes.on('data', chunk => {
//       responseData += chunk;
//     });

//     pythonRes.on('end', () => {
//       res.send(responseData); // Gửi phản hồi từ ứng dụng Python về cho người dùng
//     });
//   });

//   pythonReq.on('error', error => {
//     res.status(500).send(error.message);
//   });

//   // Gửi dữ liệu tới ứng dụng Python
//   pythonReq.write(data);
//   pythonReq.end();
// });

// app.post('/search', async (req, res) => {
//   const data = req.body;
//   const jsonData = JSON.stringify(data); // Chuyển object thành chuỗi JSON
//   console.log(jsonData); // Kiểm tra kiểu dữ liệu của data, hiện tại đang là object

//   try {
//     const pythonResponse = await axios.post('http://localhost:8501/receiveData', jsonData); // Gửi chuỗi JSON đến ứng dụng Python
//     res.send(pythonResponse.data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.post('/search', (req, res) => {
//   const { songQuery } = req.body; // Assumed to be the data sent from the search bar
//   console.log(songQuery)
//   // Gửi dữ liệu tới chương trình Python sử dụng HTTP request (ví dụ là Axios)
//   axios.post('http://localhost:8501/search', { songQuery })
//       .then((response) => {
//           res.send(response.data); // Gửi kết quả từ Python trở về client
//       })
//       .catch((error) => {
//           res.status(500).send(error);
//       });
// });
// app.use(bodyParser.json());

// app.get('/search', (req, res) => {
//   // Dữ liệu cần gửi
//   const data = req.query.query;

//   // Gửi dữ liệu tới chương trình Python chạy trên Streamlit
//   axios.post('http://localhost:8501/receive-data', data) // Thay đổi URL theo địa chỉ Python chạy Streamlit
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     });
// });

// Route để xử lý dữ liệu từ web nghe nhạc
// app.get('/search', async (req, res) => {
//   try {
//     // Gửi request lên server Python (app.py trên Streamlit) cùng với dữ liệu từ web nghe nhạc
//     const response = await axios.post('http://localhost:8501/receive-data', {
//       musicData: req.query.query // Thay 'musicData' bằng tên dữ liệu bạn muốn gửi
//     });

//     // Xử lý phản hồi từ server Python (nếu cần)
//     console.log(response.query);

//     res.send('Dữ liệu đã được gửi thành công đến server Python.');
//   } catch (error) {
//     res.status(500).send('Lỗi khi gửi dữ liệu đến server Python.');
//   }
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/search', (req, res) => {
//   const searchTerm = req.body.searchTerm; // Nhận dữ liệu từ frontend

//   // Gửi dữ liệu tới ứng dụng Python
//   const dataToSend = { searchTerm }; // Chuẩn bị dữ liệu cần gửi
//   const pythonAppUrl = 'http://localhost:5000/receive-search-data'; // Địa chỉ endpoint Python
//   request.post({
//     url: pythonAppUrl,
//     json: dataToSend
//   }, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       res.json({ status: 'Data sent to Python' }); // Trả về kết quả cho frontend
//     } else {
//       res.status(500).json({ error: 'Failed to send data to Python' });
//     }
//   });
//   // Xử lý yêu cầu tìm kiếm ở đây (có thể là logic tìm kiếm trên trang web nghe nhạc)

//   // Ví dụ trả về kết quả là một danh sách các bài hát
//   // const searchResults = [
//   //   { title: 'Song 1', artist: 'Artist 1' },
//   //   { title: 'Song 2', artist: 'Artist 2' },
//   //   // Thêm dữ liệu tìm kiếm khác tại đây
//   // ];
//   // console.log(req.body); // In ra toàn bộ dữ liệu gửi từ frontend
//   console.log(searchTerm);
//   res.json({ results: searchTerm }); // Trả về kết quả tìm kiếm
//   // console.log(searchTerm)
// });

// Get music list from csv file
const songs = [];
fs.createReadStream(
  "D:/play-music-final/Music_Recommender_System/spotify_millsongdata.csv"
)
  .pipe(csv())
  .on("data", (row) => {
    songs.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");
  });

// app.post('/search', (req, res) => {
//   const searchTerm = req.body.searchTerm; // Lấy dữ liệu tìm kiếm từ frontend

//   if (!searchTerm) {
//     return res.status(400).send('Please provide a search term.');
//   }

//   // Gửi dữ liệu tìm kiếm sang app.py
//   axios.post('http://localhost:8501/receive-search-data', { searchTerm })
//     .then(response => {
//       // Xử lý phản hồi từ ứng dụng Python (nếu cần)
//       console.log(response.data);
//       //...
//     })
//     .catch(error => {
//       // Xử lý lỗi nếu có
//       console.error(error);
//     });
// });

// Endpoint để xử lý tìm kiếm bài hát
app.get("/search", (req, res) => {
  const searchTerm = req.query.query;

  if (!searchTerm) {
    return res.status(400).send("Please provide a search term.");
  }

  // Tìm kiếm trong mảng songs
  const searchResults = songs.filter((song) => {
    return (
      song.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) // Kiểm tra tồn tại trường title trước khi sử dụng includes
    );
  });
  res.render("searchresult", { searchResults });
  //res.json(searchResults); // Trả về kết quả tìm kiếm dưới dạng JSON
});

//Kiểm tra connect to db
db.connection;

//Set static file

app.use(express.static(path.join(__dirname, "public")));

// Midleware xử lý dữ liệu từ form sublit lên
app.use(
  express.urlencoded({
    extended: true, //npm body parser
  })
);

app.use(express.json());

//HTTP logger
app.use(morgan("combined"));

//Template engine

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route init
app.use(express.static("public"));

// Định nghĩa route để phát nhạc
app.get("/play/:songName", (req, res) => {
  const songName = req.params.songName;
  // Trả về file nhạc theo tên
  res.sendFile(__dirname + `/public/music/${songName}.mp3`);
});

route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
