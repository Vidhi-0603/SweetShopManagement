const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(`MongoDb connected successfully to ${conn.connection.host}`);
    } else {
      console.log("MongoDb connection failed");
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;