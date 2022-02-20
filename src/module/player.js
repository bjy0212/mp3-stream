const express = require("express"),
    yts = require("yt-search"),
    ffmpeg = require("fluent-ffmpeg"),
    ytdl = require("ytdl-core"),
    fs = require("fs-extra"),
    path = require("path");

const Player = {
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    Play: async (req, res) => {
        try {
            let stream = ytdl(req.query.url, {
                quality: "highestaudio",
            }).on('error', (err) => {
                console.log('e');
                throw new Error(err);
            });

            // res.writeHead(206, { "Content-Type": "audio/mpeg" });

            // ffmpeg(stream)
            //     .format('mp3')
            //     .on("error", (err) => {
            //         throw new Error(err);
            //     })
            //     .on('end', function() {
            //         console.log('Progress finished');
            //     })
            //     .pipe(res);

            stream.pipe(res);

            // console.log(`piped url ${req.query.url}`);
        } catch (e) {
            console.log("* error occured during streaming");
            console.log(e);
            res.send(e.toString());
        }
    },
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    Search: async (req, res) => {
        try {
            let result = await yts.search(req.query.q);

            res.send({ result: result });
        } catch (e) {
            console.log(e);
            res.send({ error: e });
        }
    },
};

module.exports = Player;
