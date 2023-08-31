import express from 'express'

import usersRouter from './routes/users'
import messagingRouter from './routes/messaging'

const app = express() 
const port = 3333

app.use(express.json())
 
app.use("/users", usersRouter)
app.use("/messages", messagingRouter)

app.listen(port, () => console.log(`porta aberta ${port}`))