const Middleware = {
	errorWrapper: fn => (...args) => fn(...args).catch(args[2]),
	
	errorHandler: (err, req, res, next) => {
		console.error(err.toString())
		res
			.status(err.statusCode || 500)
			.json({ message: err.message })
	}
}

module.exports = Middleware