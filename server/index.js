require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const connectDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@to-do-list.k6zekho.mongodb.net/?retryWrites=true&w=majority`)
        console.log('Connect to MongoDB successfully');
    } catch (error) {
        console.log(error)
    }
}

connectDatabase()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));