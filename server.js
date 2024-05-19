const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// Initialize Firebase Admin SDK
const serviceAccount = require('./orderly-af56f-firebase-adminsdk-qfi8l-e763d30bd5.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Generate OTP and send it to the user's phone number
app.post('/generateOTP', async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP to Firebase Realtime Database or Firestore
    void admin.database().ref(`/otp/${phoneNumber}`).set(otp);

    // Here, we'll just log it for demonstration purposes
    console.log(`Generated OTP for ${phoneNumber}: ${otp}`);

    void admin.messaging().send({
      data: {
        phoneNumber,
        otp: otp.toString()
      }
    });
    // For demonstration purposes, we'll just return the OTP


    res.status(200).json({ success: true, message: 'OTP generated successfully', otp });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to generate OTP' });
  }
});

// Verify OTP provided by the user
app.post('/verifyOTP', async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const otpProvided = req.body.otp;

    // Retrieve the OTP from Firebase Realtime Database or Firestore
    // Here, we'll just hardcode it for demonstration purposes
    const otpFromDatabase = 123456; // Replace with actual retrieval logic

    if (otpProvided == otpFromDatabase) {
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
