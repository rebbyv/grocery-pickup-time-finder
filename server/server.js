const express = require('express');
const scraper = require('./puppeteer-scraper.js');
const times = require('../pickupTimes.json')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const port = 3000;
const app = express();

app.post('/sms', (req, res) => {

  scraper()
    .then(() => {
      // Start our TwiML response.
      const twiml = new MessagingResponse();
    
      // Add a text message.
      const msg = twiml.message(`The next available grocery pickup time is ${times[0].date} from ${times[0].time}. Visit www.heb.com to order now.`);
    
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
    .catch((error) => console.log(error))

});


app.listen(port, (err) => {
  err ? console.log('Error in establishing server'): console.log(`Server is listening on port ${port}`)
})