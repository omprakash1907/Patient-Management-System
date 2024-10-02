const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authrouts'); 
const hospitalrots = require('./routes/hospitalrouts'); 


dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalrots);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
