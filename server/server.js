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
    // .then((client) => {
    //     app.use('/api/scores', client);
    // })
    // .catch(console.err);

app.get("/api/scores", (req, res) => {
    client.query("SELECT * FROM high_scores;")
    .then(results => res.send(results.rows));
})

app.post("/api/scores", (req, res) => {
    let p_name = req.body.player_name;
    let p_score = req.body.score;
    client.query(`INSERT INTO high_scores (player_name, score) VALUES ('${p_name}', ${p_score}) RETURNING *;`)
    .then(result => res.send(result.rows))
    })

app.listen(5000, () => console.log(`Listening on port`));
