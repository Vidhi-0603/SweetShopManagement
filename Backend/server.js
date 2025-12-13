const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");
const connectDB = require("./src/config/mongo.config");


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});