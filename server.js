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
        .get(new RegExp("home(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.render('home', { layout: false, login: true });
            else
                res.redirect('/#/home');
        })
        .get(new RegExp("profile(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.render('profile', { layout: false, CPanel: true });
            else
                res.redirect('/admincp/#/profile');
        })
        .get(new RegExp("/admincp.*$"), (req, res) => {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.render('cp-home', { layout: false, CPanel: true });
            else
                res.render('cp-home', { layout: "cpanel", CPanel: true });
        })
        .get(new RegExp("about(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.render('about', { layout: false });
            else
                res.redirect('/#/about');
        })
        .get(new RegExp("contact(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.render('contact', { layout: false });
            else
                res.redirect('/#/contact');
        })
        .get(new RegExp("login(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.render('login', { layout: false, login: true });
            else
                res.redirect('/#/login');
        })
        .get(new RegExp("register(\\.(?:htm|html))?(\\?.*)?$"), (req, res) => {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.render('login', { layout: false, register: true });
            else
                res.redirect('/#/register');
        })
        .post("/API/Login", (req, res) => {
            db.collection("Users").find({ username: req.body.username, password: md5(req.body.password) }).toArray((err, data) => {
                ret_val = { correct: false, user: data[0] }
                if (data.length > 0) { delete ret_val.user.password; ret_val.correct = true; }
                res.json(ret_val);
            });
        })
        .post("/API/User", (req, res) => {
            db.collection("Users").insert({ name: req.body.name, username: req.body.username, email: req.body.email, password: md5(req.body.password) });
            db.collection("Users").find({ username: req.body.username, password: md5(req.body.password) }).toArray((err, data) => {
                ret_val = { correct: false, user: data[0] }
                if (data.length > 0) { delete ret_val.user.password; ret_val.correct = true; }
                res.json(ret_val);
            });
        })
        .put("/API/User", (req, res) => {
            db.collection("Users").updateOne({ _id: new Mongodb.ObjectId(req.body._id) }, { name: req.body.name, username: req.body.username, email: req.body.email, password: md5(req.body.password) }, { upsert: true }, (err, data) => {
                if (err) return res.send(err);
                else res.json(data);
            });
        })
        .get("/API/Employees", (req, res) => {
            db.collection("Employees").find().toArray((err, data) => {
                if (err) return res.send(err);
                else res.json(data);
            });
        })
        .post("/API/Employee", (req, res) => {
            db.collection("Employees").insertOne({ name: req.body.name, dept: req.body.dept, joinDate: req.body.joinDate, salary: req.body.salary, eval: req.body.eval }, (err, data) => {
                if (err) return res.send(err);
                else res.json(data);
            });
        })
        .put("/API/Employee", (req, res) => {
            db.collection("Employees").updateOne({ _id: new Mongodb.ObjectId(req.body._id) }, { name: req.body.name, dept: req.body.dept, joinDate: req.body.joinDate, salary: req.body.salary, eval: req.body.eval }, { upsert: true }, (err, data) => {
                if (err) return res.send(err);
                else res.json(data);
            });
        })
        .delete("/API/Employee",
        (req, res) => {
            db.collection("Employees").remove({ _id: new Mongodb.ObjectId(req.body._id) }, (err, data) => {
                if (err) return res.send(err);
                else res.json(data);
            });
        })
        .post("/API/Message", (req, res) => {
            db.collection("Messages").insertOne({ name: req.body.name, email: req.body.email, message: req.body.msg }, (err, data) => {
                if (err) return res.send(err);
                else res.json(data);
            });
        });
})