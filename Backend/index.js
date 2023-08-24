const connectToMongo=require('./db');
var cors = require('cors')
const express = require('express')
connectToMongo();
const app = express()
const port = 5000

app.use(cors())
//if you want to use req.body then we have  to use middleware
app.use(express.json());

//Availaible Routes


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port http://localhost:${port}`)
})