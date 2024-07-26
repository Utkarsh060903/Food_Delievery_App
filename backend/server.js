import express from "express"
import cors from 'cors'
import { connnectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
const app = express()
const port = 4005

//middleware
app.use(express.json())
app.use(cors())

//db conncetion 
connnectDB();

//api endpoint
app.use('/api/food' , foodRouter)
app.use('/images' , express.static('uploads'))
app.use('/api/user' , userRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/order' , orderRouter)

app.get('/' , (req,res) => {
    res.send('API working')
})

app.listen(port , ()=>{
    console.log(`Server started on http://localhost:${port}`)
})