    const express = require('express');
    const bodyParser = require('body-parser');

    const port = 8000;

    const app = express();

    app.use(bodyParser.json());

    app.post('/dialog', (req, res) => {
        const { message } = req.body;

        res.json({ leandro: message });

    });

    app.listen(port,() => console.log(`Running on port ${port}`));