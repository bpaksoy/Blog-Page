const express = require("express");
const app = express();
const port = process.env.PORT || 8060;

const env = process.env.NODE_ENV || "development";
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const bodyParser = require("body-parser");
const ejs = require("ejs");
app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//getting all users from the users table
app.get("/users", function(req, res, next){
  knex('users')
  .then(function(users){
    console.log(users);
    //the first parameter is gonna look for ejs folder, the second one is gonna render the data
    res.render("users", {users});
  });
});

app.post("/users", function(req, res, next){
  const { username } = req.body;
  knex("users")
  .insert({
    username: username
  })
  .then(function(){
    res.redirect("/users")
  });
});

app.get("/users/:id", function(req, res, next){
 const id = req.params.id;
 knex("users")
 .where("id", id)
 .first()
 .then(function(user){
   knex("posts")
   .where("user_id", id)
   .then(function(posts){
     knex("comments")
      .then(function(comments){
        console.log("this is comments", comments);
        res.render("user", {user, posts, comments});
      });
   });
 });
});

app.post("/users/:id", function(req, res, next){
  const id = req.params.id;
  const {title, post} = req.body;
  knex("posts")
  .insert({
    title: title,
    post: post,
    user_id: id
  }).then(function(){
    res.redirect("/users/" + id)
  });
});

//Create a new comment

app.post("/users/:user_id/posts/:post_id/comments", function (req, res, next){
  const user_id = req.params.user_id;
  const post_id = req.params.post_id;
  const { comment } = req.body;
  knex("comments")
  .insert({
    user_id : user_id,
    post_id : post_id,
    comment: comment
  }).then(function(){
    res.redirect("/users/"+ user_id);
  });

})

app.get("/posts", function (req, res, next){
  knex("posts")
  .then(function(posts){
    res.render("posts", {posts})
  });
});


app.listen(8060, function(){
  console.log("listening on ", port)
});
