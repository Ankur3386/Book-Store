import app from './app.js'
import connectdb from './db/index.js'
const PORT = process.env.PORT||5000
connectdb();
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})
