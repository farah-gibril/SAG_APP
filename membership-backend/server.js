// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const userRoutes = require('./routes/user');
// const paymentRoutes = require('./routes/payment');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/membership')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.use('/api/users', userRoutes);
// app.use('/api/payments', paymentRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/payment');

const app = express();

// Middlewear
app.use(cors());
app.use(bodyParser.json());

// Database conection
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
