const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
app.use(require("./routes/student"));
const dbo = require('./db/conn');

app.listen(5000, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    })
    console.log('connect to server')
})