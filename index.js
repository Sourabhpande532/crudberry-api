const express = require( "express" );
const app = express();
const cors = require( "cors" );
app.use( express.json() );
app.use( cors() );


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

app.get( "/", ( req, res ) => {
    res.send( "Hello, Welcome to CRUD expressJs app. (MERN SETUP)" )
} )

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
            res.status( 200 ).json( { success: true, message: "Successfully Fetched all books.", data: books } )
        } else {
            res.status( 404 ).json( { error: "book not found." } )
        }
    } catch ( error ) {
        res.status( 500 ).json( { error: "Internal Error while getting book." } )
    }
} )

/* 4. Create an API to get a book's detail by its title. Make sure to do error handling.
*/
const getBookByTitle = async ( bookTitle ) => {
    try {
        const book = await NewBook.findOne( { title: bookTitle } );
        return book
    } catch ( error ) {
        console.log( "❌ Failed to fetch movie by title.", error.message );
        throw error
    }
}

app.get( "/api/books/:bookId", async ( req, res ) => {
    try {
        const book = await getBookByTitle( req.params.bookId )
        res.status( 200 ).json( { success: true, message: "Successfully fetch book by title.", data: book } )
    } catch ( error ) {
        console.log( "Internal server error while fetching book", error.message );
        res.status( 500 ).json( { success: false, message: "Internal server error while fetching book." } )
    }
} )

/*5.Create an API to get details of all the books by an author. Make sure to do error handling.*/

const getBooksByAuthor = async ( authorName ) => {
    try {
        const booksAuthor = await NewBook.find( { author: authorName } )
        return booksAuthor;
    } catch ( error ) {
        console.log( "Failed to fetch book by author.", error.message );
        throw error;
    }
}

app.get( "/api/books/author/:authorName", async ( req, res ) => {
    try {
        const authorBooks = await getBooksByAuthor( req.params.authorName );
        if ( authorBooks.length > 0 ) {
            return res.status( 200 ).json( {
                success: true,
                message: "Successfully Fetch book by author",
                data: authorBooks
            } )
        }
        return res.status( 404 ).json( { success: false, message: "book not found." } );

    } catch ( error ) {
        res.status( 500 ).json( { success: false, message: "Server error, while find book by author." } )
    }
} )

/* 6. Create an API to get all the books which are of "Business" genre.
 */
const getBookByGenre = async ( genreBusiness ) => {
    try {
        const booksBusiness = await NewBook.find( { genre: genreBusiness } )
        return booksBusiness
    } catch ( error ) {
        console.log( "Failed to fetch genre by business.", error.message );
        throw error
    }
}

app.get( "/api/books/genre/:genreName", async ( req, res ) => {
    try {
        const booksBusiness = await getBookByGenre( req.params.genreName );
        if ( booksBusiness.length > 0 ) {
            res.status( 200 ).json( { success: true, message: 'Successfully Fetch genre!', data: booksBusiness } )
        } else {
            res.status( 404 ).json( { success: false, message: "book not found." } )
        }
    } catch ( error ) {
        res.status( 500 ).json( { success: false, message: "Internal error, while get genre business." } )
    }
} )
/* 7. Create an API to get all the books which was released in the year 2012.
 */
async function getBooksByYear( year ) {
    try {
        const yearBooks = await NewBook.find( { publishedYear: year } );
        return yearBooks;
    } catch ( error ) {
        console.log( "Failed to fetch book by year", error.message );
        throw error
    }
}

app.get( "/api/books/year/:publishedYear", async ( req, res ) => {
    try {
        const publishedBooks = await getBooksByYear( req.params.publishedYear )
        if ( publishedBooks.length > 0 ) {
            return res.status( 200 ).json( {
                success: true,
                message: "Successfully fetch book by year",
                data: publishedBooks
            } )
        }
        return res.status( 404 ).json( { success: false, message: "book not found in the database." } )
    } catch ( error ) {
        return res.status( 500 ).json( { success: false, message: "Internal error, while fetch book by publishedYear" } )
    }
} )

/* 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
Updated book rating: { "rating": 4.5 } */

const updateBookByRating = async ( bookId, dataToUpdat ) => {
    try {
        const updatedBook = await NewBook.findByIdAndUpdate( bookId, dataToUpdat, { new: true } )
        return updatedBook
    } catch ( error ) {
        console.log( "Failed to update book.", error.message );
        throw error
    }
}
app.post( "/api/books/:bookId", async ( req, res ) => {
    try {
        const bookUpdated = await updateBookByRating( req.params.bookId, req.body );
        if ( !bookUpdated ) {
            res.status( 404 ).json( { success: false, message: "book doen not exits in db" } )
        } else {
            res.status( 200 ).json( { success: true, message: "Update book successfully!", data: bookUpdated } )
        }
    } catch ( error ) {
        res.status( 500 ).json( { success: false, message: "Server error,updating book" } )
    }
} )

/* 9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
Updated book data: { "publishedYear": 2017, "rating": 4.2 } */

async function updateBookByTitle( bookTitle, dataToUpdate ) {
    try {
        const book = await NewBook.findOneAndUpdate( { title: bookTitle }, dataToUpdate, { new: true } )
        return book
    } catch ( error ) {
        console.log( "Failed to update title.", error.message );
        throw error
    }
}

app.post( "/api/books/title/:bookTitle", async ( req, res ) => {
    try {
        const updatedBook = await updateBookByTitle( req.params.bookTitle, req.body );
        if ( !updatedBook ) {
            return res.status( 404 ).json( { success: false, message: "Book doesn't exits." } )
        } else {
            res.status( 200 ).json( { success: true, message: "Successfully updated!", data: updatedBook } )
        }
    } catch ( error ) {
        return res.status( 500 ).json( { success: false, message: "Server error, Failed to update book by title", error } )
    }
} )

/*10. Create an API to delete a book with the help of a book id, Send an error message "Book not found" in case the book does not exist. Make sure to do error handling. */

async function deleteBookById( bookId ) {
    try {
        const deletedBook = await NewBook.findByIdAndDelete( bookId )
        return deletedBook;
    } catch ( error ) {
        console.log( "Failed to delete book.", error );
        throw error
    }
}

app.delete( "/api/deletebook/:bookId", async ( req, res ) => {
    try {
        const deletedBook = await deleteBookById( req.params.bookId );
        if ( !deletedBook ) return res.status( 404 ).json( "Book not found." )
        return res.status( 200 ).json( { success: true, message: "Deleted successfully!", data: deletedBook } )
    } catch ( error ) {
        res.status( 500 ).json( { success: false, message: "Server error, while deleting book." } )
    }
} )

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log( `Server is running on http://localhost:${ PORT }` );
} )