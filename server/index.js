// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const cloudinary = require('cloudinary').v2; // Cloudinary
// const authRoutes = require('./routes/authrouts');
// const hospitalrots = require('./routes/hospitalrouts');
// const doctorRoutes = require('./routes/doctorRoutes'); // Import doctor routes
// const patientRoutes = require('./routes/patientrouts');
// const appointmentRouts=require('./routes/appointmentRoutes')
// const PrescriptionRouts=require('./routes/PrescriptionRouts')
// const paymentRoutes = require('./routes/paymentRoutes');
// const billRoutes = require('./routes/billRoutes');


// dotenv.config(); // Load environment variables


// connectDB(); // Connect to the database

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const app = express();

// // Middleware for parsing
// app.use(express.urlencoded({ extended: true  }));
// app.use(express.json());

// // Routes
//  app.use('/api/auth', authRoutes);
// app.use('/api/hospital', hospitalrots);
// app.use('/api/doctor', doctorRoutes);  
// app.use('/api/patients', patientRoutes); 
// app.use('/api/appointments', appointmentRouts); 
// app.use('/api/prescription',  PrescriptionRouts); 
// app.use('/api/payment', paymentRoutes);
// app.use('/api', billRoutes);

// // Error handling for invalid routes
// app.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// });

// // General error handler
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// server.js (or app.js)
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./config/db');
const Chat = require('./models/Chat'); 

// Import route files
const authRoutes = require('./routes/authrouts');
const hospitalRouts = require('./routes/hospitalrouts');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientrouts');
const appointmentRouts = require('./routes/appointmentRoutes');
const prescriptionRouts = require('./routes/PrescriptionRouts');
const paymentRoutes = require('./routes/paymentRoutes');
const billRoutes = require('./routes/billRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Adjust this based on your security requirements
        methods: ['GET', 'POST'],
    },
});

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalRouts);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRouts);
app.use('/api/prescription', prescriptionRouts);
app.use('/api/payment', paymentRoutes);
app.use('/api', billRoutes);

// Add this route to send chat messages
app.post('/api/test-chat', async (req, res) => {
    const { patientId, doctorId, sender, message } = req.body;

    try {
        // Save the chat message to the database
        const chatMessage = new Chat({
            patientId,
            doctorId,
            sender,
            message,
        });

        await chatMessage.save();

        // Emit the message using Socket.io
        io.emit('receiveMessage', chatMessage);

        res.status(200).json({ success: true, chatMessage });
    } catch (error) {
        console.error('Error saving chat message:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});

// Error handling for invalid routes
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// General error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle incoming chat messages
    socket.on('sendMessage', async (data) => {
        const { patientId, doctorId, sender, message } = data;

        try {
            // Save the chat message to the database
            const chatMessage = new Chat({
                patientId,
                doctorId,
                sender,
                message,
            });

            await chatMessage.save();

            // Emit the message to all connected clients
            io.emit('receiveMessage', chatMessage);
        } catch (error) {
            console.error('Error saving chat message:', error);
        }
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
