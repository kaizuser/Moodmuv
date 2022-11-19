import express, {Application, Request, Response, NextFunction} from 'express'
import Router from "../routes/route";

export default function createServer() {
	const app:Application = express()

	app.use('/api', Router)

	return app
}
