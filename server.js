const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookroutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminroute');


const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.mongo_url)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log('ERROR!', err));


app.use('/books', bookRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});

