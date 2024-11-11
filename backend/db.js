const mongoose = require('mongoose');

const URI = 'mongodb+srv://nahmuka:nahmuka2@cluster0.yxxjfld.mongodb.net/projectAndroid';

mongoose.connect(URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
