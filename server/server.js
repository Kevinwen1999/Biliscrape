const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());


app.post('/search', (req, res) => {
    var search = req.body.query;
    console.log("Server received:" + search);
    
    var spawn = require('child_process').spawn;
    var py = spawn('python3', ['webscraper.py']);
    
    py.stdin.write(JSON.stringify(search));
    py.stdin.end();
    
    py.stdout.on('data', (data)=> {
        console.log("Generated data: " + data);
        res.send(JSON.parse(data));
    });
    
    py.stderr.on('data', (data)=> {
        console.log("error generating data: " + data);
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});
