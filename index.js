const express = require( "express" );
const app = express();
app.use( express.json() );

const { initializeDatabase } = require( "./db/db.connect" );
const NewBook = require( "./models/book.model" )
initializeDatabase()

/* const fs = require( "fs" );
const jsonBookData = fs.readFileSync( "book.json", "utf-8" );
const bookData = JSON.parse( jsonBookData );
const seedBooks = () => {
    for ( const { title, author, publishedYear, genre, language, country, rating, summary, coverImageUrl } of bookData ) {
        const newBook = new NewBook(
            { title, author, publishedYear, genre, language, country, rating, summary, coverImageUrl }
        )
        // console.log( newBook );
        newBook.save()
    }
}
seedBooks() */

/* 1. Create an API with route "/books" to create a new book data in the books Database. Make sure to do error handling. Test your API with Postman. Add the following book:*/

async function addBookToDatabase( newBook ) {
    try {
        const book = new NewBook( newBook );
        const savedBook = await book.save();
        // console.log("😀 New book added successfully:", savedBook );
        return savedBook;
    } catch ( error ) {
        console.log( "Failed to create new book into databse", error.message );
        throw error
    }
}
// addBookToDatabase( newBook )
app.post( "/api/books", async ( req, res ) => {
    try {
        const savedBook = await addBookToDatabase( req.body );
        res.status( 201 ).json( savedBook )
    } catch ( error ) {
        res.status( 500 ).json( { error: "Internal server error,while add book" } )
    }
} )

/* 3. Create an API to get all the books in the database as response. Make sure to do error handling.
*/
const getAllBooks = async () => {
    try {
        const allBooks = await NewBook.find();
        // console.log("Fetched books:",allBooks);
        return allBooks
    } catch ( error ) {
        console.log( "Failed to get all books.", error.message );
        throw error
    }
}

app.get( "/api/books", async ( req, res ) => {
    try {
        const books = await getAllBooks();
        if ( books.length != 0 ) {
            res.status( 200 ).json( { message: "Successfully Fetched books.", data: books } )
        } else {
            res.status( 400 ).json( { error: "book not found." } )
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: "Internal Error while getting book." } )
    }
} )




const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log( `Server is running on http://localhost:${ PORT }` );
} )