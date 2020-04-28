const creds = require('../config.js')
const client = require('twilio')(creds.twilioSID, creds.twilioToken);

module.exports.sendMsg = (body) => {
  client.messages
    .create({
      body: body,
      from: '+12253962936',
      to: '+15127915873'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.log(error))
}

