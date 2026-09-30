

//this file is used to define the schema for the URL model in the MongoDB database. It uses Mongoose to create a schema that
//  defines the structure of the URL documents in the database. The schema includes fields for the original URL, the shortened URL, and the date the document was created. The Url model is then exported for use in other parts of the application.

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    visitCount: {
        type: Number,
        default: 0
    },
    lastVisitedAt: {
        type: Date,
        default: null
    }
});

const URL= mongoose.model('Url', urlSchema);

module.exports={
    URL
}
