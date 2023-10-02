require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
   .connect('${process.env.DB_CONNECTION_STRING}')
   .then(data => console.log('Connected to MongoDB'))
   .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')
const AboutMe = require('./models/aboutMeModel')
// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
const transformGoogleDriveLink = (link) => {
  const fileId = link.split('/d/')[1].split('/view')[0];
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

// Hardcoded data for About Us
const aboutUsData = {
  image: transformGoogleDriveLink('https://drive.google.com/file/d/1PADtJEL5Y-7ZlwojMVmYn78LIRA5oP3x/view?usp=drive_link'),
  name: "Angela Tao",
  paragraphs: [
    "I'm A senior at NYU Gallatin.",
    "My expertise includes frontend and backend development, and I enjoy working with the latest technologies.",
    "I also enjoy gaming, as well as dancing and singing.",
  ],
};

// a route to handle fetching the hardcoded About Us data
app.get('/aboutus', async (req, res) => {
  try {
    res.json({
      aboutUs: aboutUsData,
      status: 'all good',
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: 'failed to retrieve "About Us" data from the server',
    });
  }
});


app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})



module.exports = app // CommonJS export style!