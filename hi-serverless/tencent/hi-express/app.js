const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Express')
})

// don't forget to export!
module.exports = app
