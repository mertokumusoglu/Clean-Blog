const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");

const port = 3000
const app = express()

app.set("view engine", "ejs")

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
    const blogs = await Blog.find({})
    res.render("index", { blogs })
});

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/add_post", (req, res) => {
    res.render("add_post")
})

app.get("/post", (req, res) => {
    res.render("post")
})

app.get("/blogs/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render("post", {
        blog
    })
})

// create element for DB
app.post("/blogs", async (req, res) => {
    await Blog.create(req.body)
    res.redirect("/")
})

app.listen(port, () => {
    console.log("sunucu baslatildi")
})

