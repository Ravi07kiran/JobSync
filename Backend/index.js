const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const JobdescRoutes = require("./routes/JobdescRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { default: mongoose } = require('mongoose');
const bodyParser = require("body-parser");


require('dotenv').config();

const PORT = process.env.PORT || 4000;
const URI=process.env.URI;



const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/Jobdescription", JobdescRoutes);

app.use("/upload",uploadRoutes);


mongoose.connect(URI)

app.listen(PORT, () => {
  console.log(`I am clone bro !!`);
});
