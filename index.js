    const express = require('express');
    const bodyParser = require('body-parser');
    const watson = require('ibm-watson/assistant/v1');

    const  watsonAuth = require('./watsonAuth');

    const port = 8000;
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/resources'));

    const assistant = new  watson({
        username: watsonAuth.username,
        password: watsonAuth.password,
        url: 'https://gateway.watsonplatform.net/assistant/api/',
        version: '2019-02-28'
    });

    app.get('/', function (req, res) {
        return res.sendFile('./public/index.html');
    });
    app.get('/', function (req, res) {
        return res.sendFile('./resources/style.css');
    });

    app.post('/dialog', (req, res) => {
        const { message } = req.body;
        // console.log(message);
        assistant.message(
            {
                input: { text: message },
                workspace_id: watsonAuth.workspace_id
            },
            function (err, response) {
                // console.log();
                if (err) {
                    console.error(err);
                } else{
                    const { output } = response;
                    return res.json(output.text);
                }
            }
        );
    });

    app.listen(port,() => console.log(`Running on port ${port}`));