const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

const category = mongoose.model('category', categorySchema);

module.exports = category;