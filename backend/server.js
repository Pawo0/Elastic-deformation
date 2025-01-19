const express = require('express');
const cors = require('cors');
const { calculateSolution, kalkulator} = require('./calculator');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());


// Endpoint do rozwiązania odkształcenia sprężystego
app.post('/solve', (req, res) => {
    const { N } = req.body;
    if (N < 2) {
        return res.status(400).json({ error: 'Liczba elementów skończonych musi być >= 2' });
    }
    const solution = kalkulator.rozwiaz(N);
    // console.log(solution);
    res.json(solution);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
