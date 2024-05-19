const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');



const app = express();
const port = 3000;

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



// Define routes


// Verify Google Sign-In token and return Firebase custom token with a user and company details 
// from the mysql database
app.post('/verify-google-token', async (req, res) => {
    // Receive Google Sign-In token from the Flutter app (client-side)
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ error: 'Token is missing' });
    }
    // Verify Google Sign-In token
    await admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            // Generate Firebase custom token
            return admin.auth().createCustomToken(decodedToken.uid);
        })
        .then((customToken) => {
            console.log('Custom token created:', jwt.decode(customToken).uid);
            //fetch user and company from database and return its details with the custom token
            getUserAndCompanyByUid(jwt.decode(customToken).uid).then((results) => {
                if (!results) {
                    return res.status(404).json({ error: 'User not found' });
                }
                console.log(results);
                const user = results.user;
                const company = results.company;
                // Return custom token to the Flutter app
                res.json({ customToken, user, company });

            });
        })
        .catch((error) => {
            console.error('Error verifying Google token:', error);
            res.status(400).json({ error: 'Invalid token ' + error });
        });
});
// Verify Sign-In with Email and Password token and 
// return Firebase custom token with a user and company details
app.post('/verify-email-password-token', async (req, res) => {
    // Receive Sign-In with Email and Password token from the Flutter app (client-side)
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ error: 'Token is missing' });
    }
    // Verify Sign-In with Email and Password token
    await admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            // Generate Firebase custom token
            return admin.auth().createCustomToken(decodedToken.uid);
        })
        .then((customToken) => {
            console.log('Custom token created:', jwt.decode(customToken).uid);
            //fetch user from database and return them with the custom token
            getUserAndCompanyByUid(jwt.decode(customToken).uid).then((results) => {
                if (!results) {
                    return res.status(404).json({ error: 'User not found' });
                }
                console.log(results);
                const user = results.user;
                const company = results.company;
                // Return custom token with user and company to the Flutter app 
                res.json({ customToken, user, company });

            });
        })
        .catch((error) => {
            console.error('Error verifying Google token:', error);
            res.status(400).json({ error: 'Invalid token ' + error });
        });
});



// CRUD functions for Users and Companies
// fetch a user and company details  by uid

function getUserAndCompanyByUid(uid) {
    return new Promise((resolve, reject) => {
        dbConnection.query('SELECT * FROM Users WHERE uid = ?', [uid], (error, results) => {
            if (error) {
                console.error('Error fetching user:', error);
                return reject(error);
            }
            const rowDataPacket = results[0];
            const user = convertRowDataPacketToObject(rowDataPacket);
            //get user company
            dbConnection.query('SELECT * FROM Companies WHERE id = ?', [user.company_id], (error, results) => {
                if (error) {
                    console.error('Error fetching company:', error);
                    return reject(error);
                }
                const rowDataPacket = results[0];
                const company = convertRowDataPacketToObject(rowDataPacket);

                console.log(user);
                resolve({ user, company });
            });
        });
    });
}

app.post('/register', (req, res) => {
    // Create a new user and new company in the database
    const newUser = req.body.user;
    const newCompany = req.body.company;
    dbConnection.query('INSERT INTO Companies SET ?', newCompany, (error, result) => {
        if (error) {
            console.error('Error creating company:', error);
            return res.status(500).json({ error: error.sqlMessage });
        }
        console.log(result);
        newUser.company_id = result.insertId;

        dbConnection.query('INSERT INTO Users SET ?', newUser, (error, result) => {
            if (error) {
                console.error('\Error creating user:', error);
                return res.status(500).json({ error: error.sqlMessage });
            }

            console.log(result);
            res.json({ message: 'User and Company created successfully' });
        });
    });
});


app.put('/update-profile/:uid', (req, res) => {
    const userUid = req.params.uid;
    const user = req.body.user;
    const company = req.body.company;
    console.log(user);
    // Update the user in the database
    dbConnection.query('UPDATE Users SET ? WHERE uid = ?', [user, userUid], (error, results) => {
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }


        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(error);
        //update company if company is not null
        if (!company) {
            return res.json({ message: 'User updated successfully' });
        }
        dbConnection.query('UPDATE Companies SET ? WHERE id = ?', [company, company.id], (error, results) => {
            if (error) {
                console.error('Error updating company:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Company not found' });
            }
            console.log(error);

            // User was updated successfully
            res.json({ message: 'User updated successfully' });
        });
    });
});

function convertRowDataPacketToObject(rowDataPacket) {
    return Object.assign({}, rowDataPacket);
}
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});