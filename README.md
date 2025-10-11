**Objective:**
Build an app which let you know more about **MERN** Development. along side RESTful API to manage book data (CRUD) with proper error handling.

- **Scope**

  - `npm init -y` (Node Js project)
  - **INSTALLATION**
    - express,mongoose,cors,dotenv e.g `npm install express`
  - Create Book models in model folder
  - Established DB Connection with Mongo Db cluster url and ensure successfully connected.
  - stored some private data into `.env` file

  ***

  - **Features**
    - Build an api and teasted successfully through postman (CRUD)
    - POST /books → Create new book data (e.g., Lean In, Shoe Dog).
    - GET /books → Retrieve all books.
    - GET /books/title/:title, GET /books/author/:author → Fetch specific details.
    - GET /books/genre/business, GET /books/year/2012 → Filter by genre/year.
    - PUT /books/:id, POST /api/books/:bookTitle → Update rating/details.
    - DELETE /books/:id → Delete book by ID with error handling.
    - Add prefix to routes start from named api
    

****Deployment**:

Initialized with npm, setup Express + CORS, pushed to GitHub, and deployed on Vercel.


**Frontend:**
[Connect with frontend](https://github.com/Sourabhpande532/AppFusion)
