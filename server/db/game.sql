DROP TABLE IF EXISTS high_scores;

CREATE TABLE high_scores (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(255),
    score INT
)