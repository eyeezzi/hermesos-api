// const { verifyToken } = require('../services/AuthService')
const { verifyJWT } = require('../services/AuthService')

const Middleware = {
	errorWrapper: fn => (...args) => fn(...args).catch(args[2]),
	
	errorHandler: (err, req, res, next) => {
		console.error(err.toString())
		res
			.status(err.statusCode || 500)
			.json({ message: err.message })
	},

	authShield: (req, res, next) => {
		const jwt = req.body.jwt || req.query.jwt || req.headers['x-access-token']

		if (!jwt) {
			return res.status(401).json({message: 'No JWT token provided.'})
		}

		try {
			const claims = verifyJWT(jwt)
			// ? = retrieve user info from DB and attach to req
			// req.claims should now be accessible from any request handler
			req.claims = claims
			next()
		} catch (err) {
			return res.status(401).json({message: 'Invalid JWT.'})
		}
	}
}

module.exports = Middleware