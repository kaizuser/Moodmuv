import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

beforeEach('Connecting to the database', function(done) {
	mongoose.connect(process.env.MONGO_URL!)
	done()
})

after('Shutting down the database', function(done) {
	mongoose.connection.close()
	done()
})
