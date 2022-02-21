const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    fs = require('fs-extra'),
    path = require('path');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/', require('./src/router/router.index'));
app.use('/player', require('./src/router/router.player'));

server.listen(10824, _ => {
    console.log(`* server listening on 0.0.0.0:10824`);
});