var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");


//app config
mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose/model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog= mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://farm2.staticflickr.com/1084/535341894_7431fa20f8.jpg",
//   body: "this is the blog post"
// });

app.get("/", function(req, res){
  res.redirect("/blogs");
});


//INDEX
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err)
    }else {
      res.render("index", {blogs:blogs});
    }
  });

});

//New Routes
app.get("/blogs/new", function(req, res){
  res.render("new");
});
//CrEATE route
app.post("/blogs", function(req, res){
  //create blog
  // Blog.create(data, callback)
  Blog.create(req.body.blog, function(err, newBlog){
      if(err){
        res.render("new");
      } else {
          //then redirect
        res.redirect("/blogs");
      }
  });
});

//SHOW Route
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  })
});



app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Blog Server Started");
});

app.listen(3000);
