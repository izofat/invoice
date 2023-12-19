const express = require('express');
const app = express();

const cors = require('cors');
const currenciesRouter = require('./routes/currencies.cjs');
app.use(cors());
app.use(express.json());
app.use(currenciesRouter);  

const port = 3000;

app.listen(port)