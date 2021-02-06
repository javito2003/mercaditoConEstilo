const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} not a valid role'
}

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    surname: { type: String, required: [true, 'Surname is required']},
    email: { type: String, required: [true, 'Email is required'],unique: true  },
    password: { type: String, required: [true, 'Password is required'] },
    rol: { type: String, default: 'USER', enum: roles },
    url: {type: String, default: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'},
    date: { type: Date, default: Date.now },
    activo:{type: Boolean, default: true}
})

//Validator
userSchema.plugin(uniqueValidator, { message: 'Error, email already exists' });
userSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password
    return obj
}

//Convert to model
const User = mongoose.model('User', userSchema)

export default User