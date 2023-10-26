class LoginController{
    //[GET] /madeforyou
    index(req,res) {
        res.render('login');
    }

}

module.exports = new LoginController;