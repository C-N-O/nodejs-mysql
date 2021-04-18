const express = require('express');
const mysql = require('mysql');

//Create connection object
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cliff',
  multipleStatements: true,
});

//connect
connection.connect((err) => {
  if (err) {
    console.error('Error Connecting: ' + err.stack);
    return;
  }
  console.log('Connection Successful');
});

const app = express();

/************************ROUTES *************************/
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//the people route. A request to this route will query the people table
app.get('/people', (req, res) => {
  connection.query('SELECT * from people', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.get('/cars', (req, res) => {
  connection.query('SELECT * from cars', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//We get a json response because mysql converts responses into json
/*******************END OF ROUTES **********************/

//App is listening on port 3000
app.listen('3000', () => {
  console.log('Server started on port 3000');
});
