'use strict';

const express = require('express');
const cors = require('cors');

const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const authRoutes = require('./auth/routes/auth-router.js');
const v1Routes = require('./api/v1.js');

const app = express();

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route Definitions
app.use(authRoutes);
app.use('/api/v1',v1Routes);

// 404 / not found handler
app.use('*', notFoundHandler);// this is a middleware catch all/ default handler

// Error Handler - last express route!
app.use(errorHandler); 

module.exports = {
  app,
  start: (port) => app.listen(port, console.log('up on', port))
}