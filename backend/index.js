const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors")
app.use(express.json())
require('dotenv').config({ debug: true });
const mongoDB = require('./db');
const verifyToken = require('./middleware/auth');
mongoDB()







app.use(cors({
  origin: 'http://localhost:5173',
}));




app.use("/api", require("./Routes/AuthUser"))
app.use("/api", verifyToken, require("./Routes/DisplayData"))
app.use("/api", verifyToken, require("./Routes/ordersData"))



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {

})
