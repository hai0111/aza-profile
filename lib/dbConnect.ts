import mongoose from 'mongoose'

declare global {
	var mongoose: any
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI)
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	)

let cached = global.mongoose

if (!cached) cached = global.mongoose = { conn: null, promise: null }

async function dbConnect() {
	if (cached.conn) return cached.conn
	if (!cached.promise && MONGODB_URI) {
		const opts = {
			bufferCommands: false,
		}
		cached.promise = mongoose.connect(MONGODB_URI, opts)
	}

	try {
		cached.conn = await cached.promise
	} catch (err) {
		cached.conn = null
		throw err
	}
	return cached.conn
}

export default dbConnect
