import express, {Application} from 'express'
import Router from "../../routes/route";

export default function createServer() {
	const App:Application = express()

	App.use(express.json())
	App.use('/api', Router)

	return App
}
