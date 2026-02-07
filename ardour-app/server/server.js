const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log('--- Server Configuration ---');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS is set:', !!process.env.SMTP_PASS);
console.log('---------------------------');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email Route
app.post('/api/send-email', (req, res) => {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !mobile || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Configure Nodemailer Transporter for custom SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`, // Use authenticated user to avoid spoofing filters
        to: 'ravi@ardour.in',
        replyTo: email, // Set client's email as reply-to
        subject: `customer enquiry by *${name}*`,
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('SMTP Error:', error);
            return res.status(500).json({
                error: 'Failed to send email',
                details: error.message
            });
        }
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('SERVER ERROR:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill the other process or use a different port.`);
    }
});

// Keep-alive to see if process is killed or finishes
// setInterval(() => {
//     console.log('Server is heartbeat... Time:', new Date().toLocaleTimeString());
// }, 5000);

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION:', reason);
});
