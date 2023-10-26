class SignupController{
    //[GET] /madeforyou
    index(req,res) {
        res.render('signup');
    }

}

module.exports = new SignupController;