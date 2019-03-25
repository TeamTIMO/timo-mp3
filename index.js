const config = require('./config.json')
const mqtt = require('mqtt')
var client = mqtt.connect(config.mqtt.host)

const OMXPlayer = require('omxplayer')
var omxplayer = new OMXPlayer({})

client.on('connect', function () {
  client.subscribe(config.mqtt.topic, function (err) {
    if (err) {
      console.error(err)
    }
  })
})

client.on('message', function (topic, message) {
  let json = JSON.parse(message.toString())
  if (json.type === 'mp3') {
    omxplayer.start(message.content, function (error) {
      console.error(error)
    })
  }
})