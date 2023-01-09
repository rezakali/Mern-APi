require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workout");
const blogRoutes = require("./routes/blog")
const loginRoutes = require('./routes/users')

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/user", loginRoutes);
/*app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
}); */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("conected to atlas db");
    app.listen(process.env.PORT, () => {
      console.log("listening to port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
