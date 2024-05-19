const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql');


const app = express();
const port = 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require(process.env.SERVICE_ACCOUNT_KEY_PATH);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
app.use(bodyParser.json());


// MySQL database connection configuration
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL database
dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


//fetch all favorites products of a user using the user's uid and the favorites 
// field in users table of <String>[productsId] 
app.post('/favorites', async (req, res) => {
    const uid = req.body.uid;
    getFavoritesProductsByUid(uid).then((products) => {
        res.json(products);
    }).catch((err) => {
        res.status(500).json({ error: 'Error fetching favorites products' + err });
    });
});

//fetch all products from the products table
app.post('/products/recommended', async (req, res) => {

    dbConnection.query('SELECT * FROM products', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching products' });
            return;
        }
        res.json(results.map(convertRowDataPacketToObject));
    });
});



// get  favorites_products from users table where uid = uid and decode the JSON array 
// then fetch the products from products table
function getFavoritesProductsByUid(uid) {
    return new Promise((resolve, reject) => {
        dbConnection.query('SELECT favorites_products FROM users WHERE uid = ?', [uid], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            if (results.length === 0) {
                resolve([]);
                return;
            }
            const favorites = JSON.parse(results[0].favorites_products);
            if (favorites.length === 0) {
                resolve([]);
                return;
            }
            dbConnection.query('SELECT * FROM products WHERE productId IN (?)', [favorites], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results.map(convertRowDataPacketToObject));
            });
        });
    });
}






function convertRowDataPacketToObject(rowDataPacket) {
    return Object.assign({}, rowDataPacket);
}
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});