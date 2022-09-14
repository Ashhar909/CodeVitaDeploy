const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const {uri} = require('./config/config');
const route = require('./routes/routes');
const dotenv = require("dotenv");

dotenv.config({path:"config.env"})
const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to Db");
}).catch((err) => {
    console.log(err);
})

app.use('/', route)

if ( process.env.NODE_ENV = "production") {
    app.use(express.static("client/build")) ;
}
app.listen(PORT, ()=>{
    console.log("app listening");
})