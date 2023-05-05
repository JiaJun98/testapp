const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClaimsSchema = new Schema({
    name: {type: String,required: true,},
    industry: {type: String,required: true,},
}, {
   timestamps : true, 
});

const Claims = mongoose.model('Claims', ClaimsSchema);
module.exports = Claims;