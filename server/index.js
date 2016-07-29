let express = require('express');
let express = require('body-parser');
let app = express();

app.use(bodyParser.json());

let server = app.listen(1337, function(){
	console.log("listening on port 1337");
})