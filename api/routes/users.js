const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//models import
import User from '../models/user'
//Register
router.post('/register', async(req, res) => {
    var imageRoute = "";


    imageRoute = "static/"

    console.log(req.files.file);
    if (!req.files) {
        console.log(req.files.file);
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else if (req.files.file.mimetype != "image/png" && req.files.file.mimetype != "image/jpeg") {
        res.send({
            status: false,
            message: 'Solo png o jpg'
        });
        return;
    } else if (parseInt(req.files.file.size) > 2000000) {
        res.send({
            status: false,
            message: 'El archivo debe ser menor a 2 Mb'
        });
        return;
    } else {
        
        var uploadedFile = req.files.file

        var extencion = getExtension(uploadedFile.name)

        var filename = makeid(10) + extencion
        
        uploadedFile.mv(imageRoute + "user-images/" + filename)

        //User
        const name = req.body.name
        const surname = req.body.surname
        const email = req.body.email
        const password = req.body.password
        const encryptedPassword = bcrypt.hashSync(password,10)
        const file = "user-images/" + filename

        const newUser = {
            name: name,
            surname: surname,
            email: email,
            password: encryptedPassword,
            url: file
        }

        const userDB = await User.create(newUser)
        
        res.json(userDB)
      
    }

})

router.post("/login", async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;


  var user = await User.findOne({ email: email });

  //if no email
  if (!user) {
    const toSend = {
      status: "error",
      error: "Invalid Credentials"
    };
    return res.status(401).json(toSend);
  }

  //if email and password ok
  if (bcrypt.compareSync(password, user.password)) {

    //we delete de password field
    user.set("password", undefined, { strict: false });

    const token = jwt.sign({ userData: user }, "securePasswordHere", {
      expiresIn: 60 * 60 * 24 * 30
    });

    const toSend = {
      status: "success",
      token: token,
      userData: user
    };

    return res.json(toSend);
  } else {
    const toSend = {
      status: "error",
      error: "Invalid Credentials"
    };
    return res.status(401).json(toSend);
  }
});

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = router