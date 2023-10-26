const express = require('express')
const router = express.Router()
const madeforyouController = require('../app/controllers/MadeforyouController')

router.get('/', madeforyouController.index)

module.exports = router;