const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const app = express()
const port = 80

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'static')))

const hbd_message = []

//pages

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/index.html'))
})

app.post('/view', (req, res) => {
  if (req.body["message"], req.body["from"]) {
    hbd_message.push({ "message": req.body["message"], "from": req.body["from"] })
  }
  res.redirect("/view")
})

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/view.html'))
})

//apis

let index,new_index

app.get('/api/get-hbd-message', (req, res) => {
  if (hbd_message.length.toString() == 0) {
    res.send("no content")
  } else if (hbd_message.length.toString() == 1) {
    res.send(hbd_message[0])
  } else {
    do {
      new_index = Math.floor(Math.random() * hbd_message.length)
    }
    while (new_index == index);
    index = new_index
    res.send(hbd_message[index])
  }
})

app.listen(port, () => {
  console.log(`HBD app listening on port ${port}`)
})