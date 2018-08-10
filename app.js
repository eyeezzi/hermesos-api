const dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
	const result = dotenv.config()
	if (result.error) {
		throw result.error
	}
}

const cron = require("node-cron")
const SOSDispatcher = require('./services/SOSDispatcher')
const DBService = require('./services/DBService')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express')
const AuthRouter = require('./routes/auth')
const APIRouter = require('./routes/api')
const { errorHandler } = require('./routes/middleware')

DBService.connect()
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/auth', AuthRouter)
app.use('/api', APIRouter)
app.use(errorHandler)

cron.schedule(process.env.SOS_DISPATCHER_CRON_SCHEDULE || '* * * * *', SOSDispatcher.processJobs);

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
	console.log(`Listening on ${ server.address().address }:${ server.address().port }`)
})

/*
Following good design, I see no occasion where the following should be in an app.js or routes file:

1. A model: used by controllers when needed.
2. A database connection: should be in a service used by controllers when needed.

* the routes file should simply handoff matching requests to controllers (aka handlers)
*/