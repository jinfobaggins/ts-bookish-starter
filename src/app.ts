import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import getAllBooks from './controllers/getAllBooks';

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
app.use('/getBooks', getAllBooks)



var Connection = require('tedious').Connection;

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

  // Setup event handler when the connection is established. 
  connection.on('connect', function(err) {
    if(err) {
      console.log('Error: ', err);
    } else{
        // If no error, then good to go...
        console.log('Connected');
    }
  });

  // Initialize the connection.
  connection.connect();