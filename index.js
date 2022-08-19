const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = process.env.PORT || 8000
const host = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME.herokuapp.com}` : 'http://localhost'

app.use(express.static('public'))

server.listen(port, () => {
	const portStr = port === '80' ? '' : ':' + port
	try {
		if(process.env.HEROKU_APP_NAME) {
			console.log(`Server running at: ${host}`)
		} else {
			console.log(`Server running at: ${host + portStr}`)
		}
	} catch (error) {
		console.log(error)
	}
})

app.get('/', async(req, res) => {
	await res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (user) => {
	user.on('connection', (event) => {
		io.emit('connection', event)
		console.log(`${event} - Connected`)
	})

	user.on('message', (msg) => {
		io.emit('message', msg)
	})

	user.on('disconnect', (event) => {
		console.log(`${event} - Disconnected`)
	})
})