const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
    }
)

const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required()
})

const userModel = mongoose.model('user', userSchema);

exports.User = userModel;
exports.schema = schema;