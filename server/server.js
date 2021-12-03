const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const { Client } = require("pg");

const client = new Client ({
    "user": "postgres",
    "password": "password",
    "host": "localhost",
    "database": "game"

})

client.connect()
.then(() => console.log("connected successfully"))
.catch(console.err);
