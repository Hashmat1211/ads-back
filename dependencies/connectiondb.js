//db connection
const mongoose = require("mongoose");
const config = require("./config");
const HttpStatus = require('http-status-codes');

const connection = () => {
  mongoose
    .connect(
      // `mongodb+srv://admin:${config.MONGO_ATLAS_PW}@manychatsubscribers-fpfhg.mongodb.net/test?retryWrites=true&w=majority`,
      `mongodb+srv://hashmat2526:${config.MONGO_ATLAS_PW}@mflix-kkh9f.mongodb.net/finance?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        err: err
      });
    });

  // using mongoose promise
  mongoose.Promise = global.Promise;
};
module.exports = connection;
