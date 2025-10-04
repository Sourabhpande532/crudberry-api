const express = require( "express" );
const app = express();
app.use( express.json() );
const { initializeDatabase } = require( "./db/db.connect" );
const NewBook = require( "./models/book.model" )
initializeDatabase()

app.get( "/", ( req, res ) => {
    res.send( "Hello, Express! Welcome to book library." )
} )

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log( `Server is running on http://localhost:${PORT}` );
})