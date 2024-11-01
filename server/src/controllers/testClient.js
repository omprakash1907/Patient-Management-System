// testClient.js
const io = require('socket.io-client');
const socket = io('http://localhost:4000'); // Connect to the server

// Get patientId and doctorId from command line arguments
const patientId = process.argv[2]; // First argument after script name
const doctorId = process.argv[3];   // Second argument after script name
// node ./controllers/testClient.js 670ff8b3a16d8a2c07c15205 670ff4e79104a0e8f161db67  //
socket.on('connect', () => {
    console.log('Connected to the server:', socket.id);

    // Simulate sending a message
    const chatMessage = {
        patientId: patientId, // Use dynamic patient ID
        doctorId: doctorId,   // Use dynamic doctor ID
        sender: 'patient',
        message: 'Hello from the test client!'
    };

    // Send the message to the server
    socket.emit('sendMessage', chatMessage);
    console.log('Message sent:', chatMessage);
});

// Listen for incoming messages
socket.on('receiveMessage', (data) => {
    console.log('Message received:', data);
});

// Handle socket disconnection
socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

// Error handling for connection issues
socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});
