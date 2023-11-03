const Search = require('../models/Home');


const HomeController = {
    index(req, res) {
        res.render('home')
    },

    search(req, res) {
        Search.search(req.query.query, (err, searchresults) => {
            if (err) {
                res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
            } else if (!(req.query.query)) {
                res.render('home');
            } else {
                res.render('searchresult', { searchresults });
            }
        });
    },
}

module.exports = HomeController;