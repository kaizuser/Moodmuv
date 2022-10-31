//UTILITIES
const mongoose = require('mongoose')

//CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('database connected succesfully'))
.catch((error:Error) => console.log(error))
