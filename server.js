var Mongodb = require("mongodb");
Mongodb.MongoClient.connect("mongodb://127.0.0.1:27017/MEANProject", (err, db) => {
    var express = require("express"), app = express(), exphbs = require("express-handlebars"), parser = require('body-parser'), md5 = require('md5');

    console.log("\nConnected to Database:" + db.databaseName + " successfully.");
    require("http").createServer(app).listen(3685);
    console.log("Server listen @port " + 3685 + "\n");

    var hbs = exphbs.create({
        extname: ".hbs",
        defaultLayout: "main",

        layoutsDir: "views/layouts/",
        partialsDir: "views/partials/"
    });

    app.engine(".hbs", hbs.engine)
        .set("view engine", ".hbs")
        .use(express.static('./public'))
        .use(parser.json())
        .use(parser.urlencoded({ extended: true }))
        .get(new RegExp("^\\/((?:index|default)(\\.(?:htm|html))?)?(\\?.*)?$"), (req, res) => {
            res.render('home');
        })
        .get(new RegExp("login(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            res.render('login', { login: true });
        })
        .get(new RegExp("register(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            res.render('login', { register: true });
        })
        .get(new RegExp("permission(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            res.render('cp-perm');
        })
        .get(new RegExp("admincp(\\?.*)?$"), (req, res) => {
            res.render('cp-home', { showAngular: true, CPanel: true });
        })
        .post("/loginuser", (req, res) => {
            db.collection("Users").find({ username: req.body.username, password: md5(req.body.password) }).toArray((err, data) => {
                ret_val = { correct: false, user: data[0] }
                if (data.length > 0) { delete ret_val.user.password; ret_val.correct = true; }
                res.json(ret_val)
            })
        })
        .post("/registeruser", (req, res) => {
            db.collection("Users").insert({ name: req.body.name, username: req.body.username, password: md5(req.body.password) });
            db.collection("Users").find({ username: req.body.username, password: md5(req.body.password) }).toArray((err, data) => {
                ret_val = { correct: false, user: data[0] }
                if (data.length > 0) { delete ret_val.user.password; ret_val.correct = true; }
                res.json(ret_val)
            })
        })
        .get("/API/Employees", (req, res) => {
            db.collection("Employees").find().toArray((err, data) => { res.json(data) });
        })
        .post("/API/Employee", (req, res) => {
            var resp = db.collection("Employees").insertOne({ name: req.body.name, dept: req.body.dept, joinDate: req.body.joinDate, salary: req.body.salary, eval: req.body.eval });
        })
        .post("/API/DelEmp", (req, res) => {
            db.collection("Employees").remove({ name: req.body.name, dept: req.body.dept, joinDate: req.body.joinDate, salary: req.body.salary, eval: req.body.eval });
        })
})