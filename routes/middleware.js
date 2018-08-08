const Middleware = {
	errorHandler: (err, req, res, next) => {
		console.error(err.toString())
		res
			.status(err.statusCode || 500)
			.json({ message: err.message })
	}
}

module.exports = Middleware