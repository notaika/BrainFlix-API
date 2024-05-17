const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
        const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
        console.log("SUCCESS: Request for video data was successful");
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

router.post('/:id/comments', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const params = req.params;
    const featuredVideo = videoData.find(video => video.id === params.id);

    if (featuredVideo) {
        
        const newComment = {
            id: uuidv4(),
            name: 'Mohan Muruge',
            comment: req.body.comment,
            likes: 0,
            timestamp: Date.now(),
        }

        featuredVideo.comments.push(newComment);
        fs.writeFileSync('./data/videos.json', JSON.stringify(videoData))
        res.json(newComment)
        console.log('SUCCESS: A new comment was posted')
    } else {
        res.status(404).send(`ERROR: Comment could not be submitted.`)
    }
    
});

router.post('/', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));

    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: 'Mohan Muruge',
        image: "http://localhost:8080/images/Upload-video-preview.jpg",
        description: req.body.description,
        views: "128",
        likes: "34",
        duration: "3:29",
        timestamp: Date.now(),
        comments: []
    }
    videoData.push(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData))
    res.json(newVideo)
    console.log("SUCCESS: New video was uploaded.")
})

router.delete('/:videoId/comments/:commentId', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const params = req.params;
    const featuredVideo = videoData.find(video => video.id === params.videoId);

    if (featuredVideo) {
        const featuredComment = featuredVideo.comments.findIndex(comment => comment.id === params.commentId);
        if (featuredComment > -1) {
            const deletedComment = featuredVideo.comments.splice(featuredComment, 1);
            fs.writeFileSync('./data/videos.json', JSON.stringify(videoData));
            res.send(deletedComment);
            console.log(`SUCCESS: Comment was sucessfully deleted.`)

        } else {
            res.status(404).send(`ERROR: No comment with ID was found. No comments were deleted`)
        }
    } else {
        res.status(404).send(`ERROR: No video with given ID was found.`)
    }
})
router.put('/:videoId/likes', (req, res) => {
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
    const params = req.params;
    const featuredVideo = videoData.find(video => video.id === params.videoId);
    
    if (featuredVideo) {
        featuredVideo.likes = (parseInt(featuredVideo.likes) + 1).toString();
        fs.writeFileSync('./data/videos.json', JSON.stringify(videoData))
        res.json(featuredVideo)
    } else {
        res.status(404).send(`ERROR: Unable to like comment`)
    }
})

module.exports = router;