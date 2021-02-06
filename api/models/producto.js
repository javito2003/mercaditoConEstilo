const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProducto = new Schema({
    name: { type: String, required: [true, 'Name of product is required'] },
    price: { type: Number, required: [true, 'Price of product is required'] },
    description: {type: String, default: "The seller didn't add a description"},
    date: { type: Date, default: Date.now },
    image: {type: String, required: [true,'Image is required']}
})

//Convertir a modelo
const Producto = mongoose.model('Producto', userProducto)

export default Producto