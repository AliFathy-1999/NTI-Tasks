const express = require('express');
const app = express();
const cors = require('cors');
require("../database/connect")
const userRoutes = require("../routes/user.api.routes")
const questionsRoutes = require("../routes/questions.api.routes")
app.use(cors());
app.use(express.json())
app.use('/api/user',userRoutes)
app.use('/api/questions', questionsRoutes)

module.exports = app;