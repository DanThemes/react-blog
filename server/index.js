const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/blog');

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth/', authRoutes);










app.get('/', (req, res) => {
  res.send('Nothing to see here.');
})


server.listen(3001, () => {
  console.log('Server is running...');
})