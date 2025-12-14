const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
console.log("🚀 server.js started");
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = require("./app");
const connectDB = require("./src/config/mongo.config.js");


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    console.log("✅ DB promise resolved");

  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});