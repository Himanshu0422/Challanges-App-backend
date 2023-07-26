const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConfig = require('./config/dbConfig');
const questionRoute = require('./routes/questionRoute');
const userRoute = require('./routes/userRoute');

app.use('/api/v1', questionRoute);
app.use('/api/user', userRoute);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
})