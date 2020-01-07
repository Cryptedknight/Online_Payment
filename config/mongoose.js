const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ewallet',
    {useNewUrlParser:true});

module.exports= {mongoose};