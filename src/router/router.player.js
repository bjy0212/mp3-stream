const router = require('express').Router(),
    path = require('path'),
    player = require('../module/player');

router.get('/', (req, res) => {
    res.send('player api guide');
});

router.get('/yt-search', (req, res) => {
    // 서치 엔진 api
    player.Search(req, res);
});

router.get('/listen', (req, res) => {
    // 음악 재생
    player.Play(req, res);
});

module.exports = router;