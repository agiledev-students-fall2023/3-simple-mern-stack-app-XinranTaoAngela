const mongoose = require('mongoose');

// Define the schema for the About Me section
const aboutMeSchema = new mongoose.Schema({
  image: String,
  name: String,
  paragraphs: [String],
});

// Create a model based on the schema
const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

module.exports = AboutMe;
