//Set up express server
import express from 'express';
const app = express();
const PORT = 3002;
// port should be a constant- refer in SCREAMING_SNAKE_CASE
app.use(express.json());

//Put routes
app.get('/', (req, res) => {
    res.send(' 😺Express is working 😸');
});

//Start listening on a port
app.listen(PORT, () => {
    console.log(`Now listening on http://localhost: ${PORT} ...`)
});