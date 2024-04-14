const express = require('express');
const cors = require('cors');
const app = express();
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(express.json());
require("dotenv").config();
const dbConfig = require('./config/dbConfig');
const questionRoute = require('./routes/questionRoute');

app.use('/api/v1', questionRoute);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
})