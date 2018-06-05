const express = require('express');
const mysql = require('mysql');

//mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //only include this line after execution. 
    password: 'password'
  
});

//connecting to database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connection to MySQL database created');
});
var app = express();

//routes
app.get('./createdb', (req, res) => {
    let sql = 'CREATE DATABASE storedb';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database successfully created');
    });
});

//create a MySQL table
app.get('/product_table', (req, res) => {
    let sql = 'CREATE TABLE products(prodId int AUTO_INCREMENT, brand VARCHAR(255), name VARCHAR(255), SKU VARCHAR(255) PRIMARY KEY (prodId))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('product table successfully created');
    });
});

//adding first product to table
app.get('/addProductA', (req, res) => {
    let product = {brand: 'coca-cola', name: 'coca-cola soda', SKU: 'SKU34215'};     
    let sql = 'INSERT INTO products SET?';
    let query = db.query(sql, product, (err, result) => {
        if(err) throw err;
        Console.log(result);
        res.send('product successfully added');
});
});
//adding second product to table
app.get('/addProductB', (req, res) => {
    let product = {brand: 'albany', name: 'albany bread', SKU: 'SKU65439'};     
    let sql = 'INSERT INTO products SET?';
    let query = db.query(sql, product, (err, result) => {
        if(err) throw err;
        Console.log(result);
        res.send('product successfully added');
    });
});

//select all products
app.get('/getproducts', (req, res) => {     
    let sql = 'SELECT * FROM products';
    let query = db.query(sql, product, (err, result) => {
        if(err) throw err;
        Console.log(result);
        res.send('all products selected');
    });
});

//select specific products
app.get('/getproducts/:productId', (req, res) => {     
    let sql = 'SELECT * FROM products WHERE productId = ${req.params.productId}';
    let query = db.query(sql, product, (err, result) => {
        if(err) throw err;
        Console.log(result);
        res.send('all product selected');
    });
});

//update product
app.get('/updateproducts/:productId', (req, res) => {     
    let new_name = 'Updated Name';
    let sql = 'UPDATE products SET name = ${new_name} WHERE productId = ${req.params.productId}';
    let query = db.query(sql, product, (err, result) => {
        if(err) throw err;
        Console.log(result);
        res.send('product updated');
    });
});


//delete product
app.get('/deleteproducts/:productId', (req, res) => {     
    let sql = 'DELETE FROM products  WHERE productId = ${req.params.productId}';
    let query = db.query(sql, product, (err, result) => {
        if(err) throw err;
        Console.log(result);
        res.send('product deleted');
    });
});

app.listen(8000);
    console.log('Currently running server on port 8000');

