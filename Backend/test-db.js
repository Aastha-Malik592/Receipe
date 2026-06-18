const dns = require("dns");

dns.setServers(["8.8.8.8"]);

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
  process.exit();
})
.catch((err) => {
  console.log("Connection Error:");
  console.log(err);
  process.exit(1);
});