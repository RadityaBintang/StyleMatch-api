require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


const db = require('./config/database');

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));



app.use((req, res, next) => {
  console.log(`DEBUG (app.js): Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});


app.use(express.static(path.join(__dirname, 'public'))); 

//  Load API Routes 
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes.js');
const weightRoutes = require('./routes/weightRoutes');
const outfitRoutes = require('./routes/outfitRoutes');
const mainRoutes = require('./routes/mainRoutes');


app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.use('/api/outfit', outfitRoutes);
app.use('/api/main', mainRoutes);

console.log('✅ Semua routes sudah dimount');

//  Root Redirect 
app.get('/', (req, res) => {
  res.redirect('/login.html'); 
});

//  Error Handler 
app.use((req, res) => {
  console.warn(`WARNING (app.js): 404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ success: false, message: 'Route not found' });
});



app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR HANDLER (app.js): Uncaught error:', err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong on the server.' });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🚀 Server berjalan di http://localhost:' + PORT);
});
