const express = require('express')
const morgan = require('morgan')
const route = require('./routes')
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('./config/db')

const app = express()
const port = 3000

//Kiểm tra connect to db
db.connection;

//Set static file
app.use(express.static(path.join(__dirname,'public')))

// Midleware xử lý dữ liệu từ form sublit lên
app.use(express.urlencoded({
  extended: true //npm body parser
}))

app.use(express.json())

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', exphbs.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})