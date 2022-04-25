const express = require('express');
const app = express();
const cors = require('cors');
require("../database/connect")
const userRoutes = require("../routes/user.api.routes")
//const postRoutes = require("../routes/post.api.routes")
app.use(cors());
app.use(express.json())
app.use('/api/user',userRoutes)
//app.use('/api/post', postRoutes)

module.exports = app;