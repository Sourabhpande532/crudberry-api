const mongoose = require( "mongoose" );
require( "dotenv" ).config();

const ConnectionURL = process.env.URL;
const initializeDatabase = async () => {
    try {
        const connection = await mongoose.connect( ConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true } );
        if ( connection ) {
            console.log( "Database Connected to DB." );
        }
    } catch ( error ) {
        console.log( "DB Connection failed.", error );
    }
}
module.exports = {initializeDatabase}