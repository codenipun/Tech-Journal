const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express();

mongoose.connect("mongodb+srv://nipunjain:nipun123@cluster0.n6fzazz.mongodb.net/blogDBO");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended :false}));
app.use(methodOverride('_method'));

app.use(express.static("public"));

app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({createdAt : 'desc'});
    res.render('articles/index', {articles : articles});
});

app.use('/articles', articleRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("server started at port 5000");
});