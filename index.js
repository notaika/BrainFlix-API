require('dotenv').config()
const express = require("express");
const cors = require("cors");
const videosRouter = require('./routes/videos')

const { PORT, CORS_ORIGIN, REACT_APP_BASE_URL} = process.env;

const app = express();
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static(`public`));

app.listen(PORT, () => {
    console.log(`Server started on ${REACT_APP_BASE_URL}`);
})

// ROUTES
app.get('/', (req, res) => {
    res.send('Landed on the server');
})
app.use("/videos", videosRouter);

