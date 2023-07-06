const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const categoriesRoutes = require('./routes/category');

let PORT = 8080;

let app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function(err, req, res, next) {
  if(err) {
    res.status(400).json(response);
  } else {
    next();
  }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoriesRoutes);


const server = app.listen(PORT, () => {
  console.log(`Using environment: localhost...`);
  console.log(` API server running on port ${PORT}...\n`);
});
