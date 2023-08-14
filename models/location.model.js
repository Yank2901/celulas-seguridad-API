const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    province: {
        type: String,
        required: true
    },
    cities: [{
        city: {
            type: String,
            required: true
        },
        neighborhoods: [{
            type: String,
            required: true
        }]
    }]
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;