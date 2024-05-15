const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
        const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
        console.log("Request for video data was successful");
        res.send(videoData);
    });

router.get('/:id', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const params = req.params;
    const featuredVideo = videoData.find((video) => video.id === params.id)

    if (featuredVideo) {
        res.send(featuredVideo);
    } else {
        res.status(400).send(`ERROR: Video with given ID was not found`)
    }
});

router.post('/', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: 'Mohan Muruge',
        image: "Uploade-video-preview.jpg",
        description: req.body.description,
        views: "128",
        likes: "34",
        duration: "3:29",
        timestamp: Date.now(),
        comments: []
    }
    videoData.push(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData))
    res.send("New video was uploaded.")
})

module.exports = router;