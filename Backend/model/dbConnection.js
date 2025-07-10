const mongoose = require('mongoose')
const DB_url= process.env.DB_URL;
const dbconnection = async()=>{
  await mongoose.connect(DB_url)
  
}

dbconnection()
  .then(()=>{
    console.log('connection with DATABASE successful')
})
  .catch((e)=>{
    console.log('connection with DATABASE failed',e)
  })
module.exports = dbconnection