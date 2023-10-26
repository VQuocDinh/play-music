const express = require('express')
const router = express.Router()
const artistController = require('../app/controllers/ArtistController')

router.get('/', artistController.getAllArtist)
router.get('/artistsong', artistController.getAllArtistSong)

module.exports = router;