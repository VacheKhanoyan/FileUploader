const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true
}));

const api_ver1 = require('./controllers/api');
api_ver1.initialize(app);

app.listen(1984,() =>{
	console.log("server is running on 1984 port.");
});
