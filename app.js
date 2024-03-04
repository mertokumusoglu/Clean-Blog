const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const methodOverride = require('method-override');
const blogController = require("./controllers/blogControllers");
const pageController = require("./controllers/pageControllers");

const app = express()

app.set("view engine", "ejs")

// connect DB
mongoose.connect("/*dbURL*/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
  methods: ["POST", "GET"]
}));

// ROUTES
app.get("/", blogController.getAllBlogs);
app.get("/about", pageController.getAboutPage)
app.get("/add_post", pageController.getAddPage)
app.get("/post", pageController.getPostPage)


// ROUTES - CRUD
app.get("/blogs/:id", blogController.getBlog)
app.post("/blogs", blogController.createBlog)
app.get("/blogs/edit/:id", pageController.getEditPage)
app.put("/blogs/:id", blogController.updateBlog)
app.delete("/blogs/:id", blogController.deleteBlog)

const port = 3000
app.listen(port, () => {
    console.log("sunucu baslatildi")
})

