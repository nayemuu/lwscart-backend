const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectToDatabase = require('./connectToDatabase');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const suCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const colorRoutes = require('./routes/colorRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public/`));

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/sub-category', suCategoryRoutes);
app.use('/product', productRoutes);
app.use('/color', colorRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to root Server');
});

function errorHandler(err, req, res, next) {
    console.log('error = ', err);
    if (res.headersSent) {
        next('error - headers already sent');
    } else if (err?.message) {
        res.status(500).send({ message: err.message });
    } else {
        res.status(500).send({
            message: 'there was an error, express did not give any message for this error',
        });
    }
}

app.use(errorHandler);

app.listen(port, async () => {
    await connectToDatabase();
    console.log(`response address is = http://localhost:${port}`);
});
