DROP TABLE IF EXISTS high_scores;

CREATE TABLE high_scores (
    player_name VARCHAR(255),
    score INT,
    id SERIAL PRIMARY KEY
);

 GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;