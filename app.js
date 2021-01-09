const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/buyerRoutes/authRoutes');
const sellerRoutes = require('./Routes/sellerRoutes/authRoute');
const sellerProductRoutes = require('./Routes/sellerRoutes/productRoutes');
const buyerProductRoutes = require('./Routes/buyerRoutes/productRoutes');

// config file used to save db password and port
dotenv.config({ path: "./config.env" })

const PORT = process.env.PORT || 5000
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

// To connect to DB
mongoose
    .connect(DB, options)
    .then(() =>
        console.log('DB connection successful!')
    )
    .catch(err =>
        console.log(err)
    )

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'msg from the basic route'
    });
})

app.use('/buyer', userRoutes, buyerProductRoutes)
app.use('/seller', sellerRoutes, sellerProductRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});