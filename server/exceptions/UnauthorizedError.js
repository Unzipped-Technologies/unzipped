class UnauthorizedError extends Error {
    constructor (error) {
      super(error.message)
      this.name = 'unauthorized-error'
      this.date = Date()
      this.stack = error.stack
      this.status = error.status || 403
    }
}
  
module.exports = UnauthorizedError