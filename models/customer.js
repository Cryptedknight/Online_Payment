const mongoose = require('./../config/mongoose');

const donorschema = new mongoose.Schema({
    full_name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required : true,
    },
    phone:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    reference:{
        type: String,
        required: true,
    }
});

const donor = mongoose.model('donor', donorschema);
module.exports = {donor};