const express = require('express');
const scraper = require('./puppeteer-scraper.js');
const times = require('../pickupTimes.json');
const bodyParser = require('body-parser')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const port = 1337;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  let msg;
  if (req.body.Body.toLowerCase() === 'get groceries') {
    msg = twiml.message(`Please send us your 5 digit zip code.`);
  } else if (typeof parseInt(req.body.Body) === 'number' && req.body.Body.length === 5) {
    scraper(req.body.Body)
      .then(() => {
        // Start our TwiML response.
        //const twiml = new MessagingResponse();
        // Add a text message.
        msg = twiml.message(`The next available grocery pickup time is ${times[0].date} from ${times[0].time}. Visit www.heb.com to order now.`);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      })
      .catch((error) => console.log(error))
  } else {
    msg = twiml.message('That is not a valid zip code. Please send back a 5 digit zip code.');
  }
  
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());


});


app.listen(port, (err) => {
  err ? console.log('Error in establishing server'): console.log(`Server is listening on port ${port}`)
})