const express = require('express');
const mysql = require('mysql');


let app = express(); 
let port = 5000; 

let mysqlCon = mysql.createConnection({
  host: 'localhost', 
  user:'root',
  password: 'root', 
  database: 'domaindb'
});

mysqlCon.connect((err) =>{
  if (!err)
  console.log('Connected to Database!');
  else
  console.log('Connection Failed!');
  
});

app.listen(port, () => console.log(`Express is running on port ${port}`));


app.get('/source/:domain', (req, res) => {
  mysqlCon.query('SELECT * FROM Source WHERE Domain = ?',[req.params.domain], (err, rows) => {
    if (!err )           
     res.send(rows);
     else   
     console.log(err); 
  });
    });


