var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'Hello API'});
});

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let dateObject;

  if (!dateParam) {
    dateObject = new Date();
  } else {
    dateObject = new Date(dateParam);
  }

  if (isNaN(dateObject.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
