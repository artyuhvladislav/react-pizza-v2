require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleWare = require('./middleWares/errorMiddleWare');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.USER_URL,
  }),
);
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleWare);

const myApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.use(express.static(path.join(__dirname, '/client')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
    });
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
myApp();
