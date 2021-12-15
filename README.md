# A Broswer Game written in JavaScript with React, PostgreSQL, CSS and HTML 

Select squares on a grid to uncover a mine or a gem. Gems score points while mines resest your running score to zero.

You have three 'lives' in which you can either hit a mine or 'cash out' to add to your total running score. Scores are saved to a high scores page.

You can toggle the theme of the game between 'mines' and 'christmas'.

## To run:

Run 'npm i' in both the client and server directories.

Run 'createdb game' and then 'psql -d game -f game.sql' to set up the database.

Run 'npm start' in the client directory to start the app.

Run 'npm server:dev' in the server directory to run the server.


## Browser game brief:

MVP:
- Create a JavaScript 4x4 grid game modeled on 'mines' ✔
- Users should be able to click on the grid and accumulate points each time they don't hit a mine ✔
- The grid should display a loss and refresh once a mine is hit, resetting user score ✔
- Display the user score ✔

Extensions:
- Add a server to save user scores to a high score list ✔
- Enable user to set the number of mines ✔
- Add sound responses to clicks ✔
- Add lives ✔
- Style high scores page ✔

Advanced Extension:
- Add animations to flipped/flipping cards ✔
- Choose grid size ✔
- Change game logic to make it more challenging ✔
- Add heart graphics for the lives ✔
- Instructions for main page ✔  
