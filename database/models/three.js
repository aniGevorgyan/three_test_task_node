const Mongoose = require('mongoose');

const threeSchema = new Mongoose.Schema({
    last_position: {
        number: Number,
        x: Number,
        y: Number,
        z: Number
    }
},{collection:'three', timestamps: true});

const threeModel = Mongoose.model('three', threeSchema);

module.exports = threeModel;
