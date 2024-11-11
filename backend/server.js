require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const productRoutes = require('./Routes/productsRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const errorControllers = require('./errorControllers');

require('./db'); 

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

app.use(express.json({ limit: '50mb' }));


app.use('/api', userRoutes);
app.use('/api/users', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', orderRoutes);

app.use(errorControllers);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const path = require('path');

app.use(express.static(path.join(__dirname, '../build'))); 

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

