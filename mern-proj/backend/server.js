const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const fetchPost = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      // handle success
      console.log(response.data[2].title);
    })
    .catch((error) => {
      // handle error
      console.log(error.message);
    });
};

fetchPost();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => console.log('DB connection successful'));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
