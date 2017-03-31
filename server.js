var Express = require("express"), App = Express(), Mongodb = require("mongodb");

Mongodb.MongoClient.connect("mongodb://127.0.0.1:27017/Project", (err, db) => {
    console.log("\nConnected to Database:" + db.databaseName + " successfully.");
    require("http").createServer(App).listen(3685);
    console.log("Server listen @port " + 3685 + "\n");

    App.use(Express.static('./views', { extensions: ['htm', 'html'] }))
        .use(Express.static('./public'))
        .get(new RegExp("^\\/((?:index|default)(\\.(?:htm|html))?)?(\\?.*)?$"), (req, res) => { res.sendFile("index.html", { root: __dirname }) })
});