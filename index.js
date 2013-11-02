var express = require("express");
var app = express();
app.use(express.bodyParser());

app.get('/', function (req, res, next) {
	if (!Object.keys(req.query).length) {
		return showIndex(req, res, next);
	}

	var body = '';
	if (req.query.body) {
		body = req.query.body;
		delete req.query.body;
	}
	var status = 0;
	if (req.query.status) {
		status = req.query.status|0;
		delete req.query.status;
	}

	if (status) {
		res.status(status);
	}
	if (Object.keys(req.query).length) {
		res.set(req.query);
	}
	res.send(body);

	next();
});

function showIndex (req, res, next) {
	res.sendfile('index.html');
}

app.listen(process.env.PORT || 5000);
