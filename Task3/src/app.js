const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
app.use(express.urlencoded({extended:true}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
hbs.registerPartials(path.join(__dirname,"resources/layouts"))
app.use(express.static(path.join(__dirname, 'public')));


const taskRoutes = require("./routes/task.routes");
app.use(taskRoutes)
app.get("*", (req, res)=> res.render('err404', {pageTitle: "Page Not Found"}))
module.exports = app;