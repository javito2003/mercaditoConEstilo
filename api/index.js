//Requires
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const fileUpload = require('express-fileupload');

//instances
const app = express()

//expres.config
app.use(fileUpload());
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
})
);
app.use(cors())

app.use('/api', require('./routes/users'))
app.use('/api', require('./routes/data'))
app.use('/api', require('./routes/productos'))






const uri = 'mongodb://localhost:27017/mercaditoConStilo'
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  authSource: "admin"
};
mongoose.connect(uri, options).then(
  () => {
    console.log("\n");
    console.log("*******************************".green);
    console.log("✔ Mongo Successfully Connected!".green);
    console.log("*******************************".green);
    console.log("\n");
  },
  err => {
    console.log("\n");
    console.log("*******************************".red);
    console.log("    Mongo Connection Failed    ".red);
    console.log("*******************************".red);
    console.log("\n");
    console.log(err);
  }
);

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
})

module.exports = app
