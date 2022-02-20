const router = require('express').Router(),
    path = require('path');

router.get('/', (req, res) => {
    res.send('hi');
});

router.get('/mp3', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/mp3.html'));
});

module.exports = router;