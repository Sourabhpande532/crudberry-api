const mongoose = require( "mongoose" );
const BookSchema = new mongoose.Schema( {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genre: [
        { type: String, enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical', 'Biography', 'Self-help', "Non-fiction", "Business","Autobiography", 'Other'] }
    ],
    language: {type:String, required:true},
    country: { type: String, default: "United States" },
    rating: { type: Number, min: 0, max: 10, default: 0 },
    summary: String,
    coverImageUrl: String
},{timestamps:true} )

const resultSchema = mongoose.model( "NewBook", BookSchema );
module.exports = resultSchema;