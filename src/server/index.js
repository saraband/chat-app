import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import bodyParser from 'body-parser'

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err)
    console.error(err)

  const db = client.db('chat-app')
  const app = express()
  const http = require('http').Server(app)
  const io = require('socket.io')(http)

  // HTTP
  app.use(express.static(__dirname + './../../public'))
  app.use(bodyParser.json())
  app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset='utf-8' />
          <link rel='stylesheet' href='style.css' />
        </head>
        <body>
          <div id='root'></div>
          <script src='/bundle.js'></script>
        </body>
      </html>
    `)
  })

  app.post('/roomData', (req, res) => {
    const {
      id
    } = req.body

    if(id === undefined) {
      res.status(500).end()
      return
    }

    // Retrieve room data and messages
    db.collection('rooms').findOne({_id: ObjectId(id)}, (err, room) => {
      db.collection('messages').find({roomId: id}).toArray((err, messages) => {
        const roomData = {
          ...room,
          messages
        }

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(roomData))
      })
    })
  })

  // SOCKETS
  io.on('connection', (socket) => {

    // User request rooms list
    socket.on('REQUEST_ROOMS_LIST', (id) => {

      // I only retrieve rooms with user as participant [TODO]
      db.collection('rooms').find({}).toArray((err, roomsList) => {
        socket.emit('RECEIVE_ROOMS_LIST', JSON.stringify(roomsList))
      })
    })

    // User request users list
    socket.on('REQUEST_USERS_LIST', (id) => {

      // excluding one owns id of the users list
      socket.emit('RECEIVE_USERS_LIST', JSON.stringify(usersList))
    })

    // User wishes to create a new room
    socket.on('CREATE_ROOM', (data) => {
      const {
        user,
        title,
        message,
        participants
      } = JSON.parse(data)

      const newRoom = {
        title,
        lastMessage: {
          content: message,
          date: Date.now(),
          userId: user.id,
          username: user.username
        },
        participants,
        seenBy: [{...user, date: Date.now()}]
      }

      // Creating room
      db.collection('rooms').insertOne(newRoom, (err, response) => {

        // SEND TO ALL NEW ROOMS LIST
        db.collection('rooms').find({}).toArray((err, roomsList) => {
          io.emit('RECEIVE_ROOMS_LIST', JSON.stringify(roomsList))

          // Insert message into messages collection
        })
      })
    })

    // Sending a message
    socket.on('SEND_MESSAGE', (data) => {
      const {
        user,
        roomId,
        message
      } = JSON.parse(data)

      const newMessage = {
        roomId,
        user,
        content: message,
        date: Date.now()
      }

      db.collection('messages').insertOne(newMessage, (err, result) => {
        console.log(message)
        // Send message to all clients
        io.emit('RECEIVE_MESSAGE', JSON.stringify(newMessage))
      })
    })
  })

  http.listen(8080)
})

/*
  const users = [
    { username: 'Sara'},
    { username: 'Jon'},
    { username: 'Paul'},
    { username: 'Sophie'}
  ]

  db.collection('users').insertMany(users)

  */