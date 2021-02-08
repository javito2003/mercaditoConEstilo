const express = require('express');
const router = express.Router()
const fs = require('fs')


import {checkAuth,checkAdm} from '../middlewares/authenticacion'
import Producto from '../models/producto'

//New product
router.post('/new-product',[checkAuth,checkAdm], async (req, res) => {
    var imageRoute = ""
    imageRoute = 'static/'

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
        var uploadedFile = req.files.file
        var extencion = getExtension(uploadedFile.name)

        var filename = makeid(10) + extencion

        uploadedFile.mv(imageRoute + 'product-images/' + filename)

        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const image = "product-images/"+filename
        console.log(name);

        const newProduct = {
            name: name,
            price: price,
            description: description,
            image: image
        }

        const productDB = await Producto.create(newProduct)
        console.log(productDB);
        res.json({
            status: 'success',
            product: productDB
        })
        console.log(productDB);

    }
})

router.post('/products',checkAuth, async (req, res) => {
    try {
        const productDB = await Producto.find()
        const toSend = {
            status: 'success',
            products: productDB
        }

        return res.json(toSend)

        
    } catch (error) {
        return res.status(400).json({
            message: "Can't get products",
            error: error
        })
    }
})

router.post('/product/:id',checkAuth, async (req, res) => {
    const _id = req.params.id
    try {
        const productDB = await Producto.findOne({ _id })
        const toSend = {
            status: 'success',
            product: productDB
        }

        return res.json(toSend)


    } catch (error) {
        return res.status(400).json({
            message: "Can't get the product",
            error: error
        })
    }
})



router.post('/delete-product/:id',[checkAuth,checkAdm], async (req, res) => {
    const _id = req.params.id

    try {

        const productDB = await Producto.findByIdAndDelete({ _id })
        if (!productDB) {
            return res.status(400).json({
                message: "Product not exist",
            })
        }
        return res.json({
            status: 'Success',
            data: productDB
        })

        
    } catch (error) {
        return res.status(400).json({
            message: 'Error to delete product',
            error:error
        })
    }
})

router.post('/edit-product/:id', [checkAuth, checkAdm], async (req, res) => {
    const _id = req.params.id
    const body = req.body
    try {
        const productDB = await Producto.findByIdAndUpdate(_id, body, { new: true, runValidators: true })
        
        res.json({
            message: 'Success',
            productDB
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurred an error',
            error: error
        })
    }
})


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