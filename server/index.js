const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const sqldb = require("./config/sqlDB");

try {
  sqldb.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// DB Config
const db = require("./config/keys.js").MongoURI;
//Connecting to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000 ", credentials: true }));

app.use(express.static(path.join(__dirname, "public")));
// Setting up the routes
app.use("/", require("./routes/SignIn"));
app.use("/", require("./routes/Register"));
app.use("/", require("./routes/userProfile"));
app.use("/", require("./routes/userEducation"));
app.use("/", require("./routes/workExperience"));
app.use("/", require("./routes/Jobs"));
app.use("/", require("./routes/userApplication"));
app.use("/", require("./routes/userPosts"));
app.use("/", require("./routes/fileUpload"));
app.use("/", require("./routes/employerLogin"));
app.use("/", require("./routes/employerProfile"));
app.use("/", require("./routes/jobRecommendations"));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
