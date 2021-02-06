const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const fs = require('fs')
import {checkAuth} from '../middlewares/authenticacion'

//import models
import User from '../models/user'


router.post('/data/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const userData = await User.findOne({ _id })
        const toSend = {
            status: 'Success',
            userData: userData
        }
        res.json(toSend)
    } catch (error) {
        return res.status(400).json({
            mensaje: "Can't get user",
            error: error
        })
    }

})

router.post('/user/:id', async (req, res) => {
    const id = req.params.id

    var body = req.body
    if (body.password) {
        body.password = bcrypt.hashSync(req.body.password, 10)
    }
    try {
        
        const userDB = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        res.json(userDB)


    } catch (error) {
        return res.status(500).json({
            message: 'Ocurred an error',
            error: error
        })
    }
})


router.post('/updateprofilepicture',checkAuth, async (req, res) => {

    var imageRoute = "";


    imageRoute = "static/"

    console.log(req.files);
    if (!req.files) {
        console.log(req.files);
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

        


        //Use the name of the input field (i.e. "fileToUpload") to retrieve the uploaded file
        var uploadedFile = req.files.file;

        //capturo la extensión
        var extension = getExtension(uploadedFile.name);

        //creo un nombre para el archivo, image/jpeg, image/png,
        var filename = makeid(10) + extension;



        uploadedFile.mv(imageRoute + "user-images/" + filename);
        console.log(req.userData);
        var user = await User.findOne({ _id: req.userData._id });
        var todelete = "";
        console.log(user);

        if (user.image) {
            todelete = imageRoute + user.image;
        }

        console.log(todelete);
        var options = { upsert: false };
        const userDB = await User.updateOne({ _id: req.userData._id }, { $set: { url: "user-images/" + filename } }, options, function (err, user) {


            if (todelete != "") {
                try {
                    fs.unlinkSync(todelete);
                } catch (error) {
                    console.log("error borrando imagen de usuario previa")
                }

            }


            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    url: "user-images/" + filename,
                    mimetype: uploadedFile.mimetype,
                    size: uploadedFile.size,
                }
            });
        });

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