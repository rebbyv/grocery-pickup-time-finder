// const creds = require('../config.js')
// const client = require('twilio')(creds.twilioSID, creds.twilioToken);

// //module.exports.sendMsg = (body) => {
//   client.messages
//     .create({
//       body: 'hi!',
//       from: '+12253962936',
//       to: '+12149341023'
//     })
//     .then(message => console.log(message.sid))
//     .catch(error => console.log(error))
// //}

const scraper = require('./puppeteer-scraper.js');

scraper();