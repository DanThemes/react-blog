const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const awsRoutes = require('./routes/awsRoutes');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/blog');

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use('/api/auth/', authRoutes);
app.use('/api/articles/', articleRoutes);
app.use('/api/aws/', awsRoutes);










app.get('/', (req, res) => {
  res.send('Nothing to see here.');
})


server.listen(3001, () => {
  console.log('Server is running...');
})