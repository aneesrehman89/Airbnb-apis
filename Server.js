const express = require("express");
const cors = require("cors");
const PORT = 8000;
const fileUpload = require("express-fileupload");
const app = express();

require("dotenv/config");
require("./DataBase/DataBase");
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// require("./Controllers/EmailSender");
const UserRoutes = require("./Routes/Users");
app.use("/", UserRoutes);
const OwnerRoutes = require("./Routes/Owner");
app.use("/", OwnerRoutes);
const UserLoginVerification = require("./Middleware/UserLoginVerification");
const OwnerLoginVerification = require("./Middleware/OwnerLoginVerification");
app.use("/", UserLoginVerification);
app.use("/", OwnerLoginVerification);
app.get("/", (req, res) => {
  res.send("Server is Running");
});
app.listen(PORT, () => {
  console.log(`Server IS RUNNING ON PORT ${PORT}`);
});
