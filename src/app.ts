import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import getAllBooks from './controllers/getAllBooks';
import Book from './controllers/book';
//import Book from './controllers/book'

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
var bookArray = getBooksAsList();
app.use('/getBooks', (req, res) => {res.send(bookArray)})

getBooksAsList();


function getBooksAsList(){
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    
    
    var config = {
    server: "localhost", // or "localhost"
    options: {
    trustServerCertificate: true,
    trustedConnection: true},
    authentication: {
        type: "default",
        options: {  
        userName: "JenRob",
        password: "password",
        }
    }

    };

    var connection = new Connection(config);

    var request = new Request("SELECT * FROM books", function(err){
    if (err) {
        console.log(err);
    }
});

var bookArray: Book[] = [];

request.on('row', function(columns) {
    var arr: any[] = [];
    //console.log(columns[0]);
   columns.forEach(function(column){
        arr.push(column.value);
        //console.log(column.metadata.colName);

   })

    var book = new Book(arr[0], arr[1], arr[2], arr[3])
    bookArray.push(book)
    console.log(bookArray);


});

console.log(bookArray);
    
      // Setup event handler when the connection is established. 
      connection.on('connect', function(err) {
        if(err) {
          console.log('Error: ', err);
        } else{
            console.log('Connected');
            connection.execSql(request);
        }
    });
    
    
    
      // Initialize the connection.
      connection.connect();

      return bookArray;
    
    
}
