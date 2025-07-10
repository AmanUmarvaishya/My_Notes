const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const dbconnection = require('./model/dbConnection')
dbconnection()
app.use(express.json());
app.use(cors())


const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
const auth = require('./middleware/auth');


const port = process.env.PORT||5000


app.get('/',(req,res)=>{
    console.log('okkk')
    res.send('nise')
})

app.use('/api/auth', authRouter);
app.use('/api/notes', auth, notesRouter);







app.listen(port , ()=>{
    console.log(`server start at http://localhost:${port}`)
})