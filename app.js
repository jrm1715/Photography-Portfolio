// TODO: Left off testing database

let express = require("express"),
mongoose    = require("mongoose"),
bodyParser  = require("body-parser"),
app         = express();

mongoose.connect("mongodb://localhost:27017/photrophy_portfolio", { useNewUrlParser: true, useFindAndModify: false});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let photoSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  comments: String,
  created: {type: Date, default: Date.now}
});

let Photo = mongoose.model("photo", photoSchema);

app.get("/", function(req, res) {
  res.redirect("/photos");
});

// INDEX ROUTE
app.get("/photos", function(req, res) {
  Photo.find({}, function(err, photo) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {photos: photo});
    }
  });
});

app.get("/photos/new", function(req, res) {
  res.render("new");
});

app.post("/photos", function(req, res) {
  Photo.create(req.body.photo, function(err, newPost) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/photos");
    }
  });
});

app.listen(3000, function() {
  console.log("Photrophy Portfolio App is running on port 3000");
});
