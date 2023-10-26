class MadeforyouController{
    //[GET] /madeforyou
    index(req,res) {
        res.render('madeforyou');
    }
}

module.exports = new MadeforyouController;