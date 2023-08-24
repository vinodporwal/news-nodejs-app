const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  publicationDate: Date,
  category: String,
  source: String,
  url: String,
  imageUrl: String,
  tags: [String],
  views: Number,
});

const News = mongoose.model("newsArticles", newsSchema);

export default News;
